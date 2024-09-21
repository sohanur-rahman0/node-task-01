import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('products')
@Index('idx_product_category', ['category'])  // Index on category
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  category: string;

  @Column()
  description: string;

  @OneToMany(() => Order, order => order.product) // Define the one-to-many relationship
  orders: Order[];
}
