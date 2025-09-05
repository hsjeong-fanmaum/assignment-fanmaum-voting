import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member, Star, Vote, VotingLog } from './vote.model';
import { Repository } from 'typeorm';
import { DoVoteDto, StarSearchDto, VoteSearchDto } from './vote.request.dto';
import {
	StarSearchResultListDto,
	VoteSearchResultListDto,
	VoteSingleResultDto,
} from './vote.response.dto';

@Injectable()
export class VoteService {
	constructor(
		@InjectRepository(Member) private memberRepository: Repository<Member>,
		@InjectRepository(Star) private starRepository: Repository<Star>,
		@InjectRepository(Vote) private voteRepository: Repository<Vote>,
		@InjectRepository(VotingLog)
		private votingLogRepository: Repository<VotingLog>,
	) {}

	voteListInfo(request: VoteSearchDto): VoteSearchResultListDto {
		throw new Error('Not implemented yet.');
	}

	voteInfo(vote: bigint): VoteSingleResultDto {
		throw new Error('Not implemented yet. Parameter: ' + vote);
	}

	doVote(vote: bigint, @Body() body: DoVoteDto): void {
		throw new Error(
			'Not implemented yet. Parameter: ' + vote + ', ' + body.target,
		);
	}

	searchInfo(vote: bigint, request: StarSearchDto): StarSearchResultListDto {
		throw new Error('Not implemented yet. Parameter: ' + vote);
	}
}
