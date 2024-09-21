import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ description: 'The name of the product' })
    name: string;

    @ApiProperty({ description: 'The price of the product' })
    price: number;

    @ApiProperty({ description: 'The category of the product' })
    category: string;

    @ApiProperty({ description: 'A brief description of the product' })
    description: string;
}

export class UpdateProductDto {
    @ApiProperty({ description: 'The name of the product', required: false })
    name?: string;

    @ApiProperty({ description: 'The price of the product', required: false })
    price?: number;

    @ApiProperty({ description: 'The category of the product', required: false })
    category?: string;

    @ApiProperty({ description: 'A brief description of the product', required: false })
    description?: string;
}
