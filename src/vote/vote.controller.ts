import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { VoteService } from './vote.service';
import { DoVoteDto, StarSearchDto, VoteSearchDto } from './vote.request.dto';
import {
	StarSearchResultListDto,
	VoteSearchResultListDto,
	VoteSingleResultDto,
} from './vote.response.dto';

@Controller('vote')
export class VoteController {
	constructor(private readonly voteService: VoteService) {}

	@Get()
	async voteListInfo(
		@Query()
		request: VoteSearchDto,
	): Promise<VoteSearchResultListDto> {
		return this.voteService.voteListInfo(request);
	}

	@Get('/:vote')
	async voteInfo(@Param('vote') vote: number): Promise<VoteSingleResultDto> {
		return this.voteService.voteInfo(vote);
	}

	@Post('/:vote')
	async doVote(
		@Param('vote') vote: bigint,
		@Body() body: DoVoteDto,
	): Promise<void> {
		return this.voteService.doVote(vote, body);
	}

	@Get('/:vote/stars')
	searchInfo(
		@Param('vote') vote: bigint,
		@Req() request: StarSearchDto,
	): StarSearchResultListDto {
		return this.voteService.searchInfo(vote, request);
	}
}
