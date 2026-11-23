import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Printer } from "./printer.entity";

export type PrintStatus = "pending" | "printed";

@Entity("print_requests")
export class PrintRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  title!: string;

  @Column({ type: "integer" })
  pages!: number;

  @Column({ type: "varchar", length: 10, default: "pending" })
  status!: PrintStatus;

  @ManyToOne(() => Printer, { nullable: false })
  @JoinColumn({ name: "printer_id" })
  printer!: Printer;
}
