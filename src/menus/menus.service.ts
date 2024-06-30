import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish, Prisma, Menu } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenusService {
  constructor(private readonly prismaService: PrismaService){}
    // Create
    async create(name: string, description: string, dishIds: number[], active: boolean): Promise<Menu> {
      // Fetch dishes based on IDs
      const dishes = await this.getDishesByIds(dishIds);
  
      // Create menu in the database
      const createdMenu = await this.prismaService.menu.create({
        data: {
          name,
          description,
          dishes: {
            connect: dishes.map((dish) => ({ id: dish.id })),
          },
          active,
        },
        include: {
          dishes: true, // Include related dishes in the response
        },
      });
  
      return createdMenu;
    }


  // Fetch dishes by IDs
  private async getDishesByIds(dishIds: number[]): Promise<Dish[]> {
    if (dishIds.length === 0) {
      return [];
    }

    const dishes = await this.prismaService.dish.findMany({
      where: {
        id: {
          in: dishIds,
        },
      },
    });

    // Check if all dish IDs were found
    if (dishes.length !== dishIds.length) {
      const foundDishIds = dishes.map(dish => dish.id);
      const notFoundIds = dishIds.filter(id => !foundDishIds.includes(id));
      throw new NotFoundException(`Dishes with IDs ${notFoundIds.join(', ')} not found`);
    }

    return dishes;
  }

  findAll() {
    return this.prismaService.menu.findMany({
      include: {
        dishes: true, // Include related dishes in the response
      },
    })
  }

  async findOne(id: number): Promise<Menu | null> {
    const menu = await this.prismaService.menu.findUnique({
      where: { id },
      include: {
        dishes: true, // Include related dishes in the response
      },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }

  async update(id:number, name: string, description: string, dishIds: number[], active: boolean): Promise<Menu> {
      // Fetch dishes based on IDs
      const dishes = await this.getDishesByIds(dishIds);
  
      // Create menu in the database
      const updatedMenu = await this.prismaService.menu.update({
        where: {id:id},
        data: {
          name,
          description,
          dishes: {
            connect: dishes.map((dish) => ({ id: dish.id })),
          },
          active,
        },
        include: {
          dishes: true, // Include related dishes in the response
        },
      });
  
      return updatedMenu;
  }

  async remove(id: number): Promise<Menu> {
    // Find the menu to delete
    const menuToDelete = await this.prismaService.menu.findUnique({
      where: { id },
      include: {
        dishes: true,
      },
    });

    if (!menuToDelete) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    // Disconnect associated dishes from the menu
    await this.prismaService.menu.update({
      where: { id },
      data: {
        dishes: {
          disconnect: menuToDelete.dishes.map(dish => ({ id: dish.id })),
        },
      },
    });

    // Now delete the menu itself
    const deletedMenu = await this.prismaService.menu.delete({
      where: { id },
    });

    return deletedMenu;
  }
}
