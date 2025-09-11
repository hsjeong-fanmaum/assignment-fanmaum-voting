import { Module } from '@nestjs/common';
import { StarService } from './star.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [StarService],
})
export class StarModule {}
