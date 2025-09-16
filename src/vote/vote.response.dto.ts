export class VoteResultDto {
  id: bigint;
  name: string;
  startedAt: Date;
  endedAt: Date;
}

export class LeaderboardResultDto {
  _count: { id: number };
  starId: bigint;
}

export class AddVotingLogResultDto {
  id: bigint;
  userId: bigint | null;
  voteId: bigint;
  starId: bigint;
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}
