export class VoteSearchDto {
	page?: number;
	size?: number;
	status?: string;
	search?: string;
}
export class DoVoteDto {
	target: bigint;
}
export class StarSearchDto {
	q: string;
}
