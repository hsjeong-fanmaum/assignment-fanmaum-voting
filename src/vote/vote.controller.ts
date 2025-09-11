import { Controller, Get, Param, Query } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteResultDto } from './vote.response.dto';
import { SearchVoteRequestDto } from './vote.request.dto';
import { ParseBigIntPipe } from '../common/parse-big-int-pipe.service';

@Controller('vote')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Get('search')
  async searchVote(
    @Query()
    { page, size, status, search }: SearchVoteRequestDto,
  ): Promise<VoteResultDto[]> {
    return this.voteService.searchVote(page, size, status, search);
  }

  @Get('/:voteId')
  // 이제서야 드는 생각인데, async를 붙일 이유는 없을 것 같은데 맞나요?
  async getVoteById(
    @Param('voteId', ParseBigIntPipe) voteId: bigint,
  ): Promise<VoteResultDto> {
    return this.voteService.getVoteById(voteId);
  }
}
