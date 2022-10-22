import { IsNumber, IsString } from "class-validator";

export class CreateCoffeeRatingDto {
  @IsString()
  name: string;

  @IsString()
  coffee_id: string;

  @IsString()
  comment: string;

  @IsNumber()
  rating: number;
}
