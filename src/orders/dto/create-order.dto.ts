import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ description: 'The ID of the user placing the order' })
    userId: number;

    @ApiProperty({ description: 'The ID of the product being ordered' })
    productId: number;

    @ApiProperty({ description: 'The quantity of the product' })
    quantity: number;

    @ApiProperty({ description: 'The total price for the order' })
    totalPrice: number;

    @ApiProperty({ description: 'The status of the order', default: 'pending' })
    status: string;
}
