import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'The email of the user' })
    email: string;

    @ApiProperty({ description: 'The password of the user' })
    password: string;
}

export class UpdateUserDto {
    @ApiProperty({ description: 'The email of the user', required: false })
    email?: string;

    @ApiProperty({ description: 'The password of the user', required: false })
    password?: string;
}
