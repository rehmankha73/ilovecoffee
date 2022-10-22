import { Body, Controller, Post } from "@nestjs/common";
import { CoffeeRatingService } from "./coffee-rating.service";
import { CreateCoffeeRatingDto } from "./dto/create-coffee-rating.dto";
import { CoffeesService } from "../coffees/coffees.service";

@Controller('coffee-rating')
export class CoffeeRatingController {
  constructor(
    private readonly coffeeRating: CoffeeRatingService,
    private readonly coffeesService: CoffeesService,
  ) {
  }


  @Post()
  create(@Body() coffeeRating: CreateCoffeeRatingDto) {
    return this.coffeeRating.create(coffeeRating)
  }
}
