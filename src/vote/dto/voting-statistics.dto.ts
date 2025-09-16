import { Field, Int, ObjectType } from '@nestjs/graphql';
import { VoteDto } from './vote.dto';
import { StarDto } from '../../star/dto/star.dto';

@ObjectType('VotingStatistics')
export class VotingStatisticsDto {
  @Field(() => StarDto)
  star: StarDto;

  starId: bigint;

  @Field(() => VoteDto)
  vote: VoteDto;

  // 없으면 vote를 fetch할 방법이 없음
  // 다만 프론트에 넘길 이유는 없으므로 Field로 처리하지 않음
  // 애초에 GraphQL로 BigInt를 처리할 수 없기도 하고...
  voteId: bigint;

  @Field(() => Int, { description: '득표수' })
  count: number;
}
