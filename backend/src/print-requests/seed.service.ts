import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { PrintRequest } from "./print-request.entity";
import { Printer } from "./printer.entity";

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    await this.dataSource.transaction(async (manager) => {
      const printers = manager.getRepository(Printer);
      if (await printers.count()) return;
      const [available] = await printers.save([
        { name: "Impresora A", isAvailable: true },
        { name: "Impresora B", isAvailable: false },
      ]);
      await manager.getRepository(PrintRequest).save([
        { title: "Guía de laboratorio", pages: 6, status: "pending", printer: available },
        { title: "Instrucciones del taller", pages: 4, status: "printed", printer: available },
      ]);
    });
  }
}
