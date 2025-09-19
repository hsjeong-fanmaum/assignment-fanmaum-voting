import { registerEnumType } from '@nestjs/graphql';

export enum VoteStatus {
  NOT_STARTED = 'NOT_STARTED',
  RUNNING = 'RUNNING',
  ENDED = 'ENDED',
}

// TODO: register 위치가 적절한지 확인 필요
registerEnumType(VoteStatus, {
  name: 'VoteStatus',
});
