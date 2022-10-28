import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeesService } from "./coffees.service";
import { Coffee } from "./entities/coffee.entity";
import { CreateCoffeesDto } from "./dto/create-coffees.dto";
import { UpdateCoffeesDto } from "./dto/update-coffees.dto";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import { ApiForbiddenResponse, ApiResponse } from "@nestjs/swagger";

@Controller('coffees')
export class CoffeesController {

  constructor(private readonly coffeeService: CoffeesService) {}

  @ApiForbiddenResponse({ description: 'Something went wrong! Forbidden' })
  @Get() findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    // response.status(200).send('This action should return all records!');
    // return `This action should return all records! limit: ${limit}, offset: ${offset}`;

    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id') findOne(@Param('id') id: string) {
    // return `This action return one record having id #${id}`;

    return this.coffeeService.findOne(id);
  }

  // @Post()
  // @HttpCode(HttpStatus.GONE)
  // create(@Body() payload): string {
  //   return payload;
  // }

  @Post() create(@Body() createCoffee: CreateCoffeesDto) {
    // return payload;
    console.log(createCoffee instanceof CreateCoffeesDto)

    return this.coffeeService.create(createCoffee);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCoffeesDto) {
    // return `This action will update #${id} coffee with data ${JSON.stringify(
    //   body,
    // )}`;

    return this.coffeeService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return `This action will delete #${id} coffee!`;

    return this.coffeeService.remove(id);
  }

  // 'coffees/recommend'
  @Post('/recommend')
  createCoffeeWithRecommendation(@Body() coffee: Coffee) {
    console.log('here')
    console.log(coffee, 'coffee')
    return this.coffeeService.recommendCoffee(coffee);
  }
}
