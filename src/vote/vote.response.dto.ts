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
	voteStarId: number;
	name: string;
	profileImageUrl: string;
	votes: number;
}
export class StarSearchResultListDto {
	stars: StarSingleResultWithRankDto[];
}
export class StarSingleResultWithRankDto {
	id: number;
	voteStarId: number;
	name: string;
	profileImageUrl: string;
	votes: number;
}
