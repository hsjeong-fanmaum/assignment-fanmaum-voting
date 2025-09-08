import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { VoteService } from './vote.service';
import { DoVoteDto, StarSearchDto, VoteSearchDto } from './vote.request.dto';
import {
	StarSearchResultListDto,
	VoteSearchResultListDto,
	VoteSingleResultDto,
} from './vote.response.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('vote')
export class VoteController {
	constructor(private readonly voteService: VoteService) {}

	@Get()
	@ApiOperation({
		summary: '투표 검색',
		description: '투표를 검색하는 API입니다.',
	})
	async voteListInfo(
		@Query()
		request: VoteSearchDto,
	): Promise<VoteSearchResultListDto> {
		return this.voteService.voteListInfo(request);
	}

	@Get('/:vote')
	@ApiOperation({
		summary: '투표 조회',
		description: '투표 하나를 조회하는 API입니다.',
	})
	async voteInfo(@Param('vote') vote: number): Promise<VoteSingleResultDto> {
		return this.voteService.voteInfo(vote);
	}

	@Post('/:vote')
	@ApiOperation({
		summary: '투표 진행',
		description: '투표를 진행하는 API입니다.',
	})
	async doVote(
		@Param('vote') vote: bigint,
		@Body() body: DoVoteDto,
	): Promise<void> {
		return this.voteService.doVote(vote, body);
	}

	@Get('/:vote/stars')
	@ApiOperation({
		summary: '후보자 검색',
		description: '투표 후보자를 검색하는 API입니다.',
	})
	async starSearchInfo(
		@Param('vote') vote: number,
		@Query() request: StarSearchDto,
	): Promise<StarSearchResultListDto> {
		return this.voteService.starSearchInfo(vote, request);
	}
}
