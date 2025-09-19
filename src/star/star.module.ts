import { Module } from '@nestjs/common';
import { StarService } from './star.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StarController } from './star.controller';
import { StarResolver } from './star.resolver';

@Module({
  imports: [PrismaModule],
  providers: [StarService, StarResolver],
  controllers: [StarController],
  exports: [StarService],
})
export class StarModule {}
