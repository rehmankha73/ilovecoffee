import { Module } from "@nestjs/common";
import { CoffeeRatingService } from "./coffee-rating.service";
import { CoffeesModule } from "../coffees/coffees.module";
import { CoffeesService } from "../coffees/coffees.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CoffeeRating, CoffeeRatingSchema } from "./entities/coffee-rating-entity";
import { CoffeeRatingController } from './coffee-rating.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CoffeeRating.name,
        schema: CoffeeRatingSchema
      }
    ]),
    CoffeesModule
  ],
  providers: [CoffeeRatingService],
  controllers: [CoffeeRatingController]
})
export class CoffeeRatingModule {
}
