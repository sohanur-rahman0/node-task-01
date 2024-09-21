import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(email: string, password: string): Promise<User> {
    try {
      const user = this.usersRepository.create({ email, password });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by email');
    }
  }

  // Query: Retrieve users with their orders with pagination
  async getUsersWithOrders(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      return await this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.orders', 'order')
        .skip(skip)
        .take(limit)
        .getMany();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to retrieve users with orders');
    }
  }

  // Query: Retrieve top-ranking users by order count
  async getTopUsersByOrderCount() {
    try {
      return await this.usersRepository
        .createQueryBuilder('user')
        .leftJoin('user.orders', 'order')
        .groupBy('user.id')
        .orderBy('COUNT(order.id)', 'DESC')
        .select(['user.id', 'user.email', 'COUNT(order.id) AS order_count'])
        .limit(10)
        .getRawMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve top users by order count');
    }
  }

  // batch insert users 1000 each step
  async batchInsertUsers(users) {
    try {
      for (let i = 0; i < users.length; i += 1000) {
        await this.usersRepository.save(users.slice(i, i + 1000));
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to batch insert users');
    }
  }
}