import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  // Create a new product
  async create(productData: Partial<Product>): Promise<Product> {
    try {
      const product = this.productRepository.create(productData);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  // Get all products with pagination
  async findAll(page: number, limit: number): Promise<Product[]> {
    try {
      const skip = (page - 1) * limit;
      return await this.productRepository.find({
        skip,
        take: limit,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve products');
    }
  }

  // Get a single product by ID
  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve product');
    }
  }

  // Update an existing product
  async update(id: number, productData: Partial<Product>): Promise<Product> {
    try {
      await this.productRepository.update(id, productData);
      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  // Delete a product by ID
  async remove(id: number): Promise<void> {
    try {
      const result = await this.productRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete product');
    }
  }

  // batch insert products 1000 each step
  async batchInsertProducts(products) {
    try {
      for (let i = 0; i < products.length; i += 1000) {
        await this.productRepository.insert(products.slice(i, i + 1000));
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to batch insert products');
    }
  }
}