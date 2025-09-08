export class VoteSearchResultListDto {
	result: VoteSingleResultDto[];
}
export class VoteSingleResultDto {
	id: number;
	name: string;
	status: string;
	remainingDays: number;
	stars: StarSingleResultWithoutIdDto[];
}
export class StarSingleResultWithoutIdDto {
	id: number;
	name: string;
	profileImageUrl: string;
	votes: number;
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
