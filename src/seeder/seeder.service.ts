import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { faker } from '@faker-js/faker';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { OrdersService } from 'src/orders/orders.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        private readonly userService: UsersService,
        private readonly productService: ProductsService,
        private readonly orderService: OrdersService,
    ) { }

    // Seed Users
    async seedUsers() {
        const users = [];
        let password = await bcrypt.hash('123456', 10);
        for (let i = 0; i < 100000; i++) {
            users.push({
                email: `user${i}@example.com`, // Unique email
                password: password,
            });
        }
        await this.userService.batchInsertUsers(users);
    }

    // Seed Products
    async seedProducts() {
        const products = [];
        for (let i = 0; i < 100000; i++) {
            products.push({
                name: faker.commerce.productName(),
                price: Number(faker.commerce.price()),
                category: faker.commerce.department(),
                description: faker.commerce.productDescription(),
            });
        }
        await this.productService.batchInsertProducts(products);
    }

    // Seed Orders
    async seedOrders() {
        const orders = [];
        for (let i = 0; i < 100000; i++) {
            orders.push({
                user: faker.number.int({ min: 1, max: 100000 }), // Random existing user
                product: faker.number.int({ min: 1, max: 100000 }), // Random existing product
                quantity: faker.number.int({ min: 1, max: 100000 }),
                totalPrice: faker.number.int({ min: 1, max: 100000 }),
                status: 'pending',
            });
        }
        await this.orderService.batchInsertOrders(orders);
    }

    // Seed all tables
    async seedAll() {
        console.log('Seeding Users...');
        await this.seedUsers();

        console.log('Seeding Products...');
        await this.seedProducts();

        console.log('Seeding Orders...');
        await this.seedOrders();

        console.log('Seeding complete.');
        return { message: 'Seeding complete' };
    }
}
