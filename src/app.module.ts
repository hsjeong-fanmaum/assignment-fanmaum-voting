import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoteModule } from './vote/vote.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { StarModule } from './star/star.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [VoteModule, PrismaModule, CommonModule, StarModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
