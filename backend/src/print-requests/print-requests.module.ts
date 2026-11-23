import { Controller, Get, Module, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthModule } from "../auth/auth.module";
import { PrintRequest } from "./print-request.entity";
import { PrintRequestsController } from "./print-requests.controller";
import { PrintRequestsService } from "./print-requests.service";
import { Printer } from "./printer.entity";
import { SeedService } from "./seed.service";

@UseGuards(AuthGuard("jwt"))
@Controller("printers")
class PrintersController {
  constructor(@InjectRepository(Printer) private readonly printers: Repository<Printer>) {}

  @Get()
  findAll() {
    return this.printers.find({ order: { id: "ASC" } });
  }
}

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Printer, PrintRequest])],
  controllers: [PrintersController, PrintRequestsController],
  providers: [PrintRequestsService, SeedService],
})
export class PrintRequestsModule {}
