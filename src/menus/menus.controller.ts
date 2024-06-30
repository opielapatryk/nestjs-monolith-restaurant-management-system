import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenusService } from './menus.service';
import { Prisma } from '@prisma/client';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  async create(@Body() body: any) {
    const { name, description, dishes, active } = body;
    const dishIds = dishes || []; // Assuming dishes is an array of dish IDs

    const createdMenu = await this.menusService.create(name, description, dishIds, active);
    return createdMenu;
  }

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const { name, description, dishes, active } = body;
    const dishIds = dishes || [];
    
    return this.menusService.update(+id, name, description, dishIds, active);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
