export class VoteSearchDto {
	page?: bigint;
	size?: bigint;
	status?: string;
	search?: string;
}
export class DoVoteDto {
	target: bigint;
}
export class StarSearchDto {
	q: string;
}
