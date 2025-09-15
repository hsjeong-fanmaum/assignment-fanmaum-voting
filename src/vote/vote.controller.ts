import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import {
  AddVotingLogResultDto,
  LeaderboardResultDto,
  VoteResultDto,
} from './vote.response.dto';
import {
  AddVoteRequestDto,
  AddVotingLogRequestDto,
  SearchVoteRequestDto,
} from './vote.request.dto';
import { ParseBigIntPipe } from '../common/parse-big-int.pipe';
import { User } from '../common/user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('votes')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Get('/')
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

  @Get('/:voteId/leaderboard')
  async getLeaderboardOfVote(
    @Param('voteId', ParseBigIntPipe) voteId: bigint,
  ): Promise<LeaderboardResultDto[]> {
    return this.voteService.getLeaderboardOfVote(voteId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('/:voteId/execute-vote')
  async addVotingLog(
    @User('id') userId: bigint,
    @Param('voteId', ParseBigIntPipe) voteId: bigint,
    @Body() { starId }: AddVotingLogRequestDto,
  ): Promise<AddVotingLogResultDto> {
    return this.voteService.addVotingLog(userId, voteId, starId);
  }

  // 테스트 시 데이터 삽입을 위한 API
  @Post('/')
  async addVote(@Body() addVoteDto: AddVoteRequestDto): Promise<VoteResultDto> {
    //이 API를 실제로 사용해서는 안 됨
    if (process.env.NODE_ENV === 'prod') {
      throw new ForbiddenException();
    }
    return this.voteService.addVote(addVoteDto);
  }
}
