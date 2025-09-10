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
