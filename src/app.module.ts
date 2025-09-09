import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoteModule } from './vote/vote.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [VoteModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
