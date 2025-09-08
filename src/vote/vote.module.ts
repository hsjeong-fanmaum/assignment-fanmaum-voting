import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member, Star, Vote, VotingLog, VotingTarget } from './vote.model';

@Module({
	imports: [
		TypeOrmModule.forFeature([Member, Star, Vote, VotingTarget, VotingLog]),
	],
	controllers: [VoteController],
	providers: [VoteService],
})
export class VoteModule {}
