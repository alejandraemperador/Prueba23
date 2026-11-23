import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("printers")
export class Printer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 80 })
  name!: string;

  @Column({ type: "boolean", default: true })
  isAvailable!: boolean;
}
