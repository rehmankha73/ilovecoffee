import { IsNumber, IsString } from "class-validator";

export class CreateCoffeesDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsNumber()
  readonly recommendations: number;

  @IsString({each: true})
  readonly flavors: string[];

  @IsNumber()
  readonly rating: number;
}