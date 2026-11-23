import { IsInt, IsString, Matches, MaxLength, Min } from "class-validator";

export class CreatePrintRequestDto {
  @IsString()
  @MaxLength(100)
  @Matches(/\S/, { message: "title debe contener texto." })
  title!: string;

  @IsInt()
  @Min(1)
  pages!: number;

  @IsInt()
  @Min(1)
  printerId!: number;
}
