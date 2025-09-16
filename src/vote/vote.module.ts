import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { PrismaModule } from '../prisma/prisma.module';
import { VoteController } from './vote.controller';

@Module({
  imports: [PrismaModule],
  providers: [VoteService],
  controllers: [VoteController],
})
export class VoteModule {}
