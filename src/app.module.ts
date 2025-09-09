import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [VoteModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
