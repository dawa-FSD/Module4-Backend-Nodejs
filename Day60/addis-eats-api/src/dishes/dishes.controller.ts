import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiSecurity,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { PageQueryDto } from '../common/dto/page-query.dto';
import { CreateDishDto, DishDto, UpdateDishDto } from './dto/dish.dto';
import { DishesService } from './dishes.service';

@ApiTags('dishes')
@ApiSecurity('api-key')
@ApiUnauthorizedResponse({ description: 'API key is required' })
@ApiForbiddenResponse({ description: 'API key is invalid' })
@Controller({ path: 'dishes', version: '1' })
export class DishesController {
  constructor(private readonly service: DishesService) {}

  @Get()
  @ApiOperation({ summary: 'List dishes with pagination' })
  @ApiOkResponse({ description: 'Paginated dishes; prices are in santim' })
  @ApiBadRequestResponse({ description: 'Invalid pagination parameters' })
  findAll(@Query() query: PageQueryDto) {
    return this.service.findAll(query.page, query.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one dish by id' })
  @ApiOkResponse({ type: DishDto })
  @ApiBadRequestResponse({ description: 'Invalid dish ID' })
  @ApiNotFoundResponse({ description: 'Dish does not exist' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a dish' })
  @ApiCreatedResponse({ type: DishDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() dto: CreateDishDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a dish' })
  @ApiOkResponse({ type: DishDto })
  @ApiBadRequestResponse({ description: 'Validation failed or invalid ID' })
  @ApiNotFoundResponse({ description: 'Dish does not exist' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDishDto) {
    return this.service.update(id, dto);
  }
}
