import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class UserappService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(user: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: user,
    });
  }

  findAll(role?: Role) {
    if (role) {
      return this.databaseService.user.findMany({
        where: { role },
      });
    }
    return this.databaseService.user.findMany();
  }

  findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  update(id: number, user: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: user,
    });
  }

  remove(id: number) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
