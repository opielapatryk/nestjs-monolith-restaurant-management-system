import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DishesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDishDto: Prisma.DishCreateInput) {
    return this.prismaService.dish.create({
      data: createDishDto
    })
  }

  findAll() {
    return this.prismaService.dish.findMany()
  }

  findOne(id: number) {
    return this.prismaService.dish.findUnique({
      where: { id: id },
    })
  }

  update(id: number, updateDishDto: Prisma.DishUpdateInput) {
    return this.prismaService.dish.update({
      where: { id: id },
      data: updateDishDto
    })
  }

  remove(id: number) {
    return this.prismaService.dish.delete({
      where: { id: id },
    })
  }
}
