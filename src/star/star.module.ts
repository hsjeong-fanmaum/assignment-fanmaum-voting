import { Module } from '@nestjs/common';
import { StarService } from './star.service';
import { PrismaModule } from '../prisma/prisma.module';
import { StarController } from './star.controller';

@Module({
  imports: [PrismaModule],
  providers: [StarService],
  controllers: [StarController],
})
export class StarModule {}
