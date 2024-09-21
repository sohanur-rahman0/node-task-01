import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    quantity: number;

    @Column('decimal')
    totalPrice: number;


    @Index('idx_order_user')  // Index on userId
    @ManyToOne(() => User, user => user.orders) // Define the many-to-one relationship
    user: User;

    @Index('idx_order_product')  // Index on productId
    @ManyToOne(() => Product, product => product.orders) // Define the many-to-one relationship
    product: Product;

    @Column({ default: 'pending' })
    status: string;
}