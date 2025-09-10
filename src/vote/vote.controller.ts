import { Controller, Get, Query } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteStatus } from './vote.enum';
import { VoteResultDto } from './vote.response.dto';
import { ApiQuery } from '@nestjs/swagger';
import { SearchVoteRequestDto } from './vote.request.dto';

@Controller('vote')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Get('search')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'size', required: false })
  @ApiQuery({ name: 'status', enum: VoteStatus, required: false })
  @ApiQuery({ name: 'search', required: false })
  async searchVote(
    @Query()
    { page, size, status, search }: SearchVoteRequestDto,
  ): Promise<VoteResultDto[]> {
    return this.voteService.searchVote(page, size, status, search);
  }
}
