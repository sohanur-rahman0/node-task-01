import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Place a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({ status: 200, description: 'List of orders.' })
  @ApiQuery({ name: 'page', required: true, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: true, type: Number, description: 'Number of items per page' })
  findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.ordersService.findAll(page, limit);
  }

  // Endpoint to get total sales per product category
  @Get('total-sales-per-category')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Gets total sales per category' })
  @ApiResponse({ status: 200, description: 'Total sales per category.' })
  getTotalSalesPerCategory() {
    return this.ordersService.getTotalSalesPerCategory();
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', required: true, type: Number, description: 'Order ID' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order details.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel an order by ID' })
  @ApiResponse({ status: 200, description: 'Order successfully canceled.' })
  @ApiParam({ name: 'id', required: true, type: Number, description: 'Order ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }



}
