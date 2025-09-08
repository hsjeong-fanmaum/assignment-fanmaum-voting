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
	voteInfo(@Param('vote') vote: bigint): VoteSingleResultDto {
		return this.voteService.voteInfo(vote);
	}

	@Post('/:vote')
	doVote(@Param('vote') vote: bigint, @Body() body: DoVoteDto): void {
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
