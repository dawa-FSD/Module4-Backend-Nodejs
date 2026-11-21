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
  ApiConflictResponse,
} from '@nestjs/swagger';
import { PageQueryDto } from '../common/dto/page-query.dto';
import {
  CreateOrderDto,
  OrderDto,
  UpdateOrderStatusDto,
} from './dto/order.dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@ApiSecurity('api-key')
@ApiUnauthorizedResponse({ description: 'API key is required' })
@ApiForbiddenResponse({ description: 'API key is invalid' })
@Controller({ path: 'orders', version: '1' })
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List orders, newest first' })
  @ApiOkResponse({ description: 'Paginated orders' })
  findAll(@Query() query: PageQueryDto) {
    return this.service.findAll(query.page, query.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one order by id' })
  @ApiOkResponse({ type: OrderDto })
  @ApiNotFoundResponse({ description: 'Order does not exist' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Place an order using existing dish ids' })
  @ApiCreatedResponse({
    type: OrderDto,
    description: 'Order created; total is in santim',
  })
  @ApiBadRequestResponse({
    description: 'Invalid customer, area, phone or order lines',
  })
  @ApiNotFoundResponse({ description: 'A referenced dish does not exist' })
  @ApiConflictResponse({
    description: 'The order conflicts with current business rules',
  })
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update an order status' })
  @ApiOkResponse({ type: OrderDto })
  @ApiBadRequestResponse({ description: 'Invalid status' })
  @ApiNotFoundResponse({ description: 'Order does not exist' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.service.updateStatus(id, dto);
  }
}
