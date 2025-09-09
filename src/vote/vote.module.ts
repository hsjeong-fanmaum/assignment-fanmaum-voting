import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [VoteService],
})
export class VoteModule {}
