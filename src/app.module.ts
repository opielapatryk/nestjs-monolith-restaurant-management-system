import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DishesModule } from './dishes/dishes.module';

@Module({
  imports: [PrismaModule, DishesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
