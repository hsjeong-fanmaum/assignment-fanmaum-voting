import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { PrismaModule } from '../prisma/prisma.module';
import { VoteController } from './vote.controller';
import { VoteResolver } from './vote.resolver';

@Module({
  imports: [PrismaModule],
  providers: [VoteService, VoteResolver],
  controllers: [VoteController],
})
export class VoteModule {}
