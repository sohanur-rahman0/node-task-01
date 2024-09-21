import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) { }

  // Create a new order
  async create(orderData: CreateOrderDto): Promise<Order> {
    try {
      const order = this.ordersRepository.create({
        ...orderData,
        user: { id: orderData.userId } as any,
        product: { id: orderData.productId } as any,
      });
      return await this.ordersRepository.save(order);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  // Get all orders with pagination
  async findAll(page: number, limit: number): Promise<Order[]> {
    try {
      const skip = (page - 1) * limit;
      return await this.ordersRepository.find({
        relations: ['userId', 'productId'],
        skip,
        take: limit,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve orders');
    }
  }
  // Get a single order by ID
  async findOne(id: number): Promise<Order> {
    try {
      const order = await this.ordersRepository.findOne({
        where: { id },
        relations: ['userId', 'productId'],
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to retrieve order');
    }
  }

  // Update an existing order
  async update(id: number, orderData: Partial<Order>): Promise<Order> {
    try {
      await this.ordersRepository.update(id, orderData);
      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update order');
    }
  }

  // Delete an order by ID
  async remove(id: number): Promise<void> {
    try {
      const result = await this.ordersRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete order');
    }
  }

  // Query: Total sales per product category
  async getTotalSalesPerCategory() {
    try {
      return await this.ordersRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.product', 'product')
        .select('product.category', 'category')
        .addSelect('SUM(order.totalPrice)', 'total_sales')
        .groupBy('product.category')
        .getRawMany();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to retrieve total sales per category');
    }
  }

  // batch insert orders 1000 each step 
  async batchInsertOrders(orders) {
    try {
      for (let i = 0; i < orders.length; i += 1000) {
        await this.ordersRepository.insert(orders.slice(i, i + 1000));
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to batch insert orders');
    }
  }
}