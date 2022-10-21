import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Coffee } from "./entities/coffee.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreateCoffeesDto } from "./dto/create-coffees.dto";
import { UpdateCoffeesDto } from "./dto/update-coffees.dto";
import { throws } from "assert";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";

@Injectable()
export class CoffeesService {

  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>
  ) {}

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
    let coffee = await this.coffeeModel.find({_id: id}).exec();
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
    let existingCoffee = await this.coffeeModel.findOneAndUpdate({_id: id}, {$set: UpdateCoffeeDto}, {new: true}).exec();
    if (!existingCoffee) {
        throw new NotFoundException(`Coffee with id #${id} not Found`);
    }
    return existingCoffee
  }

  async remove(id: string) {
    let coffee = await this.coffeeModel.findOne({_id: id}).exec();
    return coffee.remove();
  }
}
