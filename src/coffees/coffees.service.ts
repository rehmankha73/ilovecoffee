import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { Coffee } from "./entities/coffee.entity";
import { Event } from "../events/entities/event.entity";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { CreateCoffeesDto } from "./dto/create-coffees.dto";
import { UpdateCoffeesDto } from "./dto/update-coffees.dto";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";

@Injectable({scope: Scope.REQUEST})
export class CoffeesService {

  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectConnection() private readonly connection: Connection,
    @Inject('COFFEES_BRANDS') coffees_brands: string[]
  ) {
    console.log(coffees_brands)
    console.log('database Connection initiated!')
  }

  // private coffees: Coffee[] = [{
  //   id: 1,
  //   name: 'Black Coffee',
  //   brand: 'Buddy Brew',
  //   flavors: ['chocolate', 'honey']
  // }];

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    let coffee = await this.coffeeModel.find({ _id: id }).exec();
    if (!coffee) {
      // throw new HttpException(`No Coffee with the #${id} Found!`, HttpStatus.GONE);
      throw new NotFoundException(`Coffee with the id #${id} not Found!`);
    }
    return coffee;
  }

  create(CreateCoffeesDto: CreateCoffeesDto) {
    const coffee = new this.coffeeModel(CreateCoffeesDto);
    return coffee.save();
  }

  async update(id: string, UpdateCoffeeDto: UpdateCoffeesDto) {
    let existingCoffee = await this.coffeeModel.findOneAndUpdate({ _id: id }, { $set: UpdateCoffeeDto }, { new: true }).exec();
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee with id #${id} not Found`);
    }
    return existingCoffee;
  }

  async remove(id: string) {
    let coffee = await this.coffeeModel.findOne({ _id: id }).exec();
    return coffee.remove();
  }

  async recommendCoffee(coffee: Coffee) {
    console.log(coffee, "test");
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      coffee.recommendations++;
      const recommendEvent = new this.eventModel({
        name: "recommend_coffee",
        type: "coffee",
        payload: {
          coffeeId: coffee.id
        }
      });

      await recommendEvent.save({ session });
      await coffee.save();

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }
}
