import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UserappService } from './userapp.service';
import { Prisma, Role } from '@prisma/client';

@Controller('userapp')
export class UserappController {
  constructor(private readonly userappService: UserappService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: Prisma.UserCreateInput) {
    const createdUser = this.userappService.create(user);
    if (!createdUser) {
      throw new BadRequestException('Failed to create user');
    }
    return createdUser;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('role') role?: Role) {
    const users = this.userappService.findAll(role);
    if (!users) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const user = this.userappService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Prisma.UserUpdateInput,
  ) {
    const updatedUser = this.userappService.update(+id, user);
    if (!updatedUser) {
      throw new BadRequestException('User not found');
    }
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    const user = this.userappService.remove(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
