import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
    @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
    email: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    password: string;
}

export class CreateAuthDto { }