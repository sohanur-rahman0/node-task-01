import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, Index, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from '../../orders/entities/order.entity';
@Entity('users')
@Index('idx_user_email', ['email'])  // Index on email
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Order, order => order.user) // Define the one-to-many relationship
    orders: Order[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
