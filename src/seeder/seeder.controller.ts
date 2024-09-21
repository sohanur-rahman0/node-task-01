import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeederService } from './seeder.service';

@ApiTags('seeder')
@Controller('seeder')
export class SeederController {
    constructor(private readonly seederService: SeederService) { }

    @Post('/seed-all')
    @ApiOperation({ summary: 'Seed all data' })
    @ApiResponse({ status: 201, description: 'Data seeded successfully.' })
    @ApiResponse({ status: 500, description: 'Internal server error.' })
    async seedAllData() {
        return await this.seederService.seedAll();
    }
}