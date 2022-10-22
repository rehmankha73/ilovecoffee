import { Injectable } from '@nestjs/common';
import { CoffeesService } from "../coffees/coffees.service";
import { InjectModel } from "@nestjs/mongoose";
import { CoffeeRating } from "./entities/coffee-rating-entity";
import { Model } from "mongoose";

@Injectable()
export class CoffeeRatingService {
  constructor(
    private readonly coffeesService: CoffeesService,
    @InjectModel(CoffeeRating.name) private readonly CoffeeRatingModel: Model<CoffeeRating>
  ) {
  }

  async create(rating) {
    console.log(rating)
    console.log(rating.coffee_id)
    let coffee_id = rating.coffee_id;
    const ratings = await this.CoffeeRatingModel.find({coffee_id: coffee_id}).exec();
    const items = ratings.length;
    console.log(ratings, items)

    const avg = (ratings.map(r => r.rating).reduce((a, b) => a + b, 0) / items) || 0;

    this.coffeesService.update(rating.coffee_id, {rating: avg});
    return avg;
    // const ratings = new this.CoffeeRatingModel(rating);
    // return ratings.save();
  }

}
