import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../type/UserType';
import { CreateUseDto } from 'src/dto/create_use.dto';
import { UpdateUseDto } from 'src/dto/update_use.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'user',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'user',
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      role: 'user',
    },
    {
      id: 5,
      name: 'Charlie Davis',
      email: 'charlie.davis@example.com',
      role: 'user',
    },
  ];

  findAll(): User[] {
    console.log('all users');
    return this.users;
  }

  findOne(id: number): User | undefined {
    console.log('find one');
    const users = this.users.find((user) => user.id === id);
    if (!users) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    return users;
  }

  create(user: CreateUseDto): User {
    const newId = this.users.length + 1;
    const newUser = {
      id: newId,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, user: UpdateUseDto): User | undefined {
    const existingUser = this.findOne(id);
    if (existingUser) {
      const updatedUser = { ...existingUser, ...user };
      const index = this.users.findIndex((u) => u.id === id);
      this.users[index] = updatedUser;
      console.log('update');
      return updatedUser;
    }
    throw new NotFoundException(`User with id ${id} not found.`);
  }

  delete(id: number): string {
    console.log('delete');
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      console.log('delete');
      return `User with id ${id} deleted successfully.`;
    }
    console.log('not delete');
    throw new NotFoundException(`User with id ${id} not found.`);
  }
}
