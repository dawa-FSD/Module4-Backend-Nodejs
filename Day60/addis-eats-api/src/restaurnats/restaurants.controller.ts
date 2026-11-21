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
import {
  CreateRestaurantDto,
  RestaurantDto,
  UpdateRestaurantDto,
} from './dto/restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@ApiTags('restaurants')
@ApiSecurity('api-key')
@ApiUnauthorizedResponse({ description: 'API key is required' })
@ApiForbiddenResponse({ description: 'API key is invalid' })
@Controller({ path: 'restaurants', version: '1' })
export class RestaurantsController {
  constructor(private readonly service: RestaurantsService) {}

  @Get()
  @ApiOperation({ summary: 'List restaurants with pagination' })
  @ApiOkResponse({ description: 'Paginated restaurants' })
  findAll(@Query() query: PageQueryDto) {
    return this.service.findAll(query.page, query.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one restaurant by id' })
  @ApiOkResponse({ type: RestaurantDto })
  @ApiNotFoundResponse({ description: 'Restaurant does not exist' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiCreatedResponse({ type: RestaurantDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  create(@Body() dto: CreateRestaurantDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a restaurant' })
  @ApiOkResponse({ type: RestaurantDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiNotFoundResponse({ description: 'Restaurant does not exist' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRestaurantDto,
  ) {
    return this.service.update(id, dto);
  }
}
