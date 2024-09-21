import { Controller, Get, UseGuards, Req, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Return the user information from the JWT payload.' })
  getProfile(@Req() req) {
    return req.user; // Return the user information from the JWT payload
  }

  @Get('with-orders')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retrieve users with their orders' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Return users with their orders.' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  getUsersWithOrders(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.usersService.getUsersWithOrders(page, limit);
  }

  @Get('top-users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve top-ranking users by order count' })
  @ApiResponse({ status: 200, description: 'Return top-ranking users by order count.' })
  getTopUsersByOrderCount() {
    return this.usersService.getTopUsersByOrderCount();
  }
}