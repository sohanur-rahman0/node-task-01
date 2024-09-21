import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('products')  // Tag for product-related endpoints
@Controller('products')
@ApiBearerAuth()  // JWT authentication
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  create(@Body() productData: CreateProductDto) {
    return this.productsService.create(productData);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all products with pagination' })
  @ApiResponse({ status: 200, description: 'List of products.' })
  @ApiQuery({ name: 'page', required: true, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: true, type: Number, description: 'Number of items per page' })
  findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.productsService.findAll(page, limit);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product details.' })
  @ApiParam({ name: 'id', required: true, type: Number, description: 'Product ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully updated.' })
  @ApiParam({ name: 'id', required: true, type: Number, description: 'Product ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() productData: UpdateProductDto,
  ) {
    return this.productsService.update(id, productData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully deleted.' })
  @ApiParam({ name: 'id', required: true, type: Number, description: 'Product ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
