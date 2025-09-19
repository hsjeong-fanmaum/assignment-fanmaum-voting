import { registerEnumType } from '@nestjs/graphql';

export enum VoteStatus {
  NOT_STARTED = 'NOT_STARTED',
  RUNNING = 'RUNNING',
  ENDED = 'ENDED',
}

registerEnumType(VoteStatus, {
  name: 'VoteStatus',
});
