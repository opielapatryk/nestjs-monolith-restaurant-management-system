import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DishesModule } from './dishes/dishes.module';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [PrismaModule, DishesModule, MenusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
