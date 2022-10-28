import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCoffeesDto {
  @ApiProperty({ name: 'name', description: 'name of the coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ name: 'brand', description: 'brand of the coffee' })
  @IsString()
  readonly brand: string;

  @IsNumber()
  readonly recommendations: number;

  @ApiProperty({ name: 'flavors', description: 'flavors of the coffee' })
  @IsString({each: true})
  readonly flavors: string[];

  @IsNumber()
  readonly rating: number;
}