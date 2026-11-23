import { IsIn, IsOptional } from "class-validator";
import type { PrintStatus } from "../print-request.entity";

export class ListPrintRequestsDto {
  // TODO: validar el parámetro opcional status de acuerdo con el enunciado.
  @IsOptional()
  @IsIn(["pending","printend"])
  status?: PrintStatus;
}
