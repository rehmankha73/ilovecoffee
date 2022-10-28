import { PartialType } from "@nestjs/swagger";
import { CreateCoffeesDto } from "./create-coffees.dto";

export class UpdateCoffeesDto extends PartialType(CreateCoffeesDto){}

// export class UpdateCoffeesDto {
//   readonly name?: string;
//   readonly brand?: string;
//   readonly flavors?: string[];
// }