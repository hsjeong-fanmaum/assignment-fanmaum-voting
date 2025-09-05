export class VoteSearchResultListDto {
	result: VoteSingleResultDto[];
}
export class VoteSingleResultDto {
	id: bigint;
	name: string;
	status: string;
	remainingDays: bigint;
	stars: StarSingleResultWithoutIdDto[];
}
export class StarSingleResultWithoutIdDto {
	name: string;
	profileImageUrl: string;
	votes: bigint;
}
export class StarSearchResultListDto {
	stars: StarSingleResultWithRankDto[];
}
export class StarSingleResultWithRankDto {
	id: bigint;
	name: string;
	profileImageUrl: string;
	votes: bigint;
	rank: bigint;
}
