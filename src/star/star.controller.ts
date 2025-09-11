import { Controller, Get, Param, Query } from '@nestjs/common';
import { StarService } from './star.service';
import { ParseBigIntPipe } from '../common/parse-big-int-pipe.service';
import { GetStarResultDto } from './star.response.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('star')
export class StarController {
  constructor(private starService: StarService) {}

  @Get('/search')
  @ApiQuery({ name: 'q', required: false })
  //query parameter 이름은 과제 요구사항에서 명시한 것과 통일
  async searchStar(@Query('q') keyword?: string): Promise<GetStarResultDto[]> {
    return this.starService.searchStar(keyword);
  }

  @Get('/:id')
  async getStarById(
    @Param('id', ParseBigIntPipe) id: bigint,
  ): Promise<GetStarResultDto> {
    return this.starService.getStarById(id);
  }
}
