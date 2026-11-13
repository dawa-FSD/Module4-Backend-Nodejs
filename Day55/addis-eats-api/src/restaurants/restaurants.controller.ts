// import { Controller } from '@nestjs/common';

// @Controller('restaurants')
// export class RestaurantsController {}
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { RestaurantsService } from './restaurants.service';
import type { Restaurant, Area } from './restaurant.types';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurants: RestaurantsService) {}

  @Get()
  findAll(@Query('area') area?: Area): Restaurant[] {
    return this.restaurants.findAll(area);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Restaurant {
    return this.restaurants.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRestaurantDto): Restaurant {
    return this.restaurants.create(dto);
  }
}
