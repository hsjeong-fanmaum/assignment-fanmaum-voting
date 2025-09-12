import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { StarService } from './star.service';
import { ParseBigIntPipe } from '../common/parse-big-int.pipe';
import { StarResultDto } from './star.response.dto';
import { ApiQuery } from '@nestjs/swagger';
import { AddStarRequestDto } from './star.request.dto';

@Controller('stars')
export class StarController {
  constructor(private starService: StarService) {}

  @Get('/')
  @ApiQuery({ name: 'q', required: false })
  //query parameter 이름은 과제 요구사항에서 명시한 것과 통일
  async searchStar(@Query('q') keyword?: string): Promise<StarResultDto[]> {
    return this.starService.searchStar(keyword);
  }

  @Get('/:id')
  async getStarById(
    @Param('id', ParseBigIntPipe) id: bigint,
  ): Promise<StarResultDto> {
    return this.starService.getStarById(id);
  }

  // 테스트 시 데이터 삽입을 위한 API
  @Post('/')
  async addStar(@Body() addStarDto: AddStarRequestDto): Promise<StarResultDto> {
    //이 API를 실제로 사용해서는 안 됨
    if (process.env.NODE_ENV === 'prod') {
      throw new ForbiddenException();
    }
    return this.starService.addStar(addStarDto);
  }
}
