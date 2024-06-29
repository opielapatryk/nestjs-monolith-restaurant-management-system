import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { Prisma } from '@prisma/client';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  create(@Body() createDishDto: Prisma.DishCreateInput) {
    return this.dishesService.create(createDishDto);
  }

  @Get()
  findAll() {
    return this.dishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishDto: Prisma.DishUpdateInput) {
    return this.dishesService.update(+id, updateDishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishesService.remove(+id);
  }
}
