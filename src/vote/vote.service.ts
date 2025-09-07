import { Body, Injectable } from '@nestjs/common';
import { DoVoteDto, StarSearchDto, VoteSearchDto } from './vote.request.dto';
import {
	StarSearchResultListDto,
	VoteSearchResultListDto,
	VoteSingleResultDto,
} from './vote.response.dto';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

@Injectable()
export class VoteService {
	constructor() {}

	async voteListInfo(
		request: VoteSearchDto,
	): Promise<VoteSearchResultListDto> {
		// const searchOptions: VoteWhereInput = {};
		// if (request.search) searchOptions.name = request.search;
		// if (request.status) {
		// 	if (request.status === 'NOT_STARTED')
		// 		searchOptions.startDt = { le: new Date() };
		// 	else if (request.status === 'ENDED')
		// 		searchOptions.endDt = { ge: new Date() };
		// 	else if (request.status === 'RUNNING') {
		// 		searchOptions.startDt = { ge: new Date() };
		// 		searchOptions.endDt = { le: new Date() };
		// 	}
		// }
		const now = new Date();
		const voteResult = await prisma.vote.findMany({
			// include: {
			// 	VotingLog: {
			// 		by: []
			// 	},
			// },
			where: {
				name: request.search ? { in: [request.search] } : undefined,
				startDt:
					request.status && request.status !== 'ENDED'
						? request.status === 'NOT_STARTED'
							? { lt: now }
							: { gte: now }
						: undefined,
				endDt:
					request.status && request.status !== 'NOT_STARTED'
						? request.status === 'ENDED'
							? { gte: now }
							: { lt: now }
						: undefined,
			},
			skip: ((request.page || 1) - 1) * (request.size || 10),
			take: request.size || 10,
		});
		const voteResultIds = voteResult.map((value) => value.id);

		const fullVotedResult = await prisma.votingLog.groupBy({
			_count: true,
			by: ['vote_id', 'star_id'],
			where: {
				vote_id: { in: voteResultIds },
			},
		});

		const starResultIds = [
			...new Set(
				fullVotedResult
					.map((value) => value.star_id)
					.filter((value) => value !== null),
			),
		];

		const starResult = Object.fromEntries(
			(
				await prisma.star.findMany({
					where: {
						id: { in: starResultIds },
					},
				})
			).map((value) => [value.id, value]),
		);

		const votedResultObj =
			fullVotedResult.reduce(
				(obj, value) => {
					if (value.vote_id === null || value.star_id === null)
						return obj;
					const star = starResult[value.star_id];
					const newVar = {
						name: star.name,
						profileImageUrl: star.profileImageUrl,
						votes: value._count,
					};
					if (obj[value.vote_id]) {
						obj[value.vote_id].push(newVar);
					} else obj[value.vote_id] = [newVar];
				},
				{} as Record<
					string,
					{
						name: string;
						profileImageUrl: string;
						votes: number;
					}[]
				>,
			) || {};

		return {
			result: voteResult.map(
				(value) =>
					<VoteSingleResultDto>{
						id: value.id,
						name: value.name,
						status:
							value.startDt > new Date()
								? 'NOT_STARTED'
								: value.endDt < new Date()
									? 'ENDED'
									: 'RUNNING',
						remainingDays: Math.floor(
							(value.endDt.valueOf() - Date.now()) /
								(1000 * 60 * 60 * 24),
						),
						stars: votedResultObj[value.id],
					},
			),
		};

		// await prisma.vote.groupBy({
		// 	by: ['id'],
		// 	_count: true,
		// 	where: {
		// 		name: request.search ? { in: [request.search] } : undefined,
		// 		startDt:
		// 			request.status && request.status !== 'ENDED'
		// 				? request.status === 'NOT_STARTED'
		// 					? { lt: now }
		// 					: { gte: now }
		// 				: undefined,
		// 		endDt:
		// 			request.status && request.status !== 'NOT_STARTED'
		// 				? request.status === 'ENDED'
		// 					? { gte: now }
		// 					: { lt: now }
		// 				: undefined,
		// 	},
		//
		// });
		// return <VoteSearchResultListDto>{
		// 	result: voteResult.map(
		// 		(value) =>
		// 			<VoteSingleResultDto>{
		// 				id: value.id,
		// 				name: value.name,
		// 				status: 'TEMP',
		// 				remainingDays: 0,
		// 				stars: <StarSingleResultWithoutIdDto[]>[],
		// 			},
		// 	),
		// 	resultCount: resultCount,
		// };
	}

	voteInfo(vote: bigint): VoteSingleResultDto {
		throw new Error('Not implemented yet. Parameter: ' + vote);
	}

	doVote(vote: bigint, @Body() body: DoVoteDto): void {
		throw new Error(
			'Not implemented yet. Parameter: ' + vote + ', ' + body.target,
		);
	}

	searchInfo(vote: bigint, request: StarSearchDto): StarSearchResultListDto {
		throw new Error('Not implemented yet. Parameter: ' + vote);
	}
}
