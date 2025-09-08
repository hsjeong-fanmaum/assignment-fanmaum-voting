import { Body, Injectable } from '@nestjs/common';
import { DoVoteDto, StarSearchDto, VoteSearchDto } from './vote.request.dto';
import {
	StarSearchResultListDto,
	StarSingleResultWithoutIdDto,
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
		const now = new Date();
		return prisma.vote
			.findMany({
				include: {
					VotingTarget: {
						select: {
							id: true,
							Star: true,
							_count: {
								select: {
									VotingLog: {
										where: {
											alive: 1,
										},
									},
								},
							},
						},
						orderBy: {
							VotingLog: {
								_count: 'desc',
							},
						},
						skip: 0,
						take: 2,
					},
				},
				where: {
					name: request.search
						? { contains: request.search }
						: undefined,
					startDt:
						request.status && request.status !== 'ENDED'
							? request.status === 'NOT_STARTED'
								? { gt: now }
								: { lte: now }
							: undefined,
					endDt:
						request.status && request.status !== 'NOT_STARTED'
							? request.status === 'ENDED'
								? { lte: now }
								: { gt: now }
							: undefined,
				},
				skip: (+(request.page || 1) - 1) * +(request.size || 10),
				take: +(request.size || 10),
			})
			.then(
				(queryResult) =>
					<VoteSearchResultListDto>{
						result: queryResult.map(
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
									stars: value.VotingTarget.filter(
										(votingResultValue) =>
											votingResultValue._count
												.VotingLog !== 0,
									).map(
										(votingResultValue) =>
											<StarSingleResultWithoutIdDto>{
												id: votingResultValue.Star.id,
												voteStarId:
													votingResultValue.id,
												name: votingResultValue.Star
													.name,
												profileImageUrl:
													votingResultValue.Star
														.profileImageUrl,
												votes: votingResultValue._count
													.VotingLog,
											},
									),
								},
						),
					},
			);
	}

	async voteInfo(vote: number): Promise<VoteSingleResultDto> {
		return prisma.vote
			.findUnique({
				include: {
					VotingTarget: {
						select: {
							id: true,
							Star: true,
							_count: {
								select: {
									VotingLog: {
										where: {
											alive: 1,
										},
									},
								},
							},
						},
						orderBy: {
							VotingLog: {
								_count: 'desc',
							},
						},
						skip: 0,
						take: 2,
					},
				},
				where: {
					id: +vote,
				},
			})
			.then((value) => {
				if (value === null)
					throw new Error('Cannot find vote with this id: ' + vote);
				return <VoteSingleResultDto>{
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
					stars: value.VotingTarget.filter(
						(votingResultValue) =>
							votingResultValue._count.VotingLog !== 0,
					).map(
						(votingResultValue) =>
							<StarSingleResultWithoutIdDto>{
								id: votingResultValue.Star.id,
								voteStarId: votingResultValue.id,
								name: votingResultValue.Star.name,
								profileImageUrl:
									votingResultValue.Star.profileImageUrl,
								votes: votingResultValue._count.VotingLog,
							},
					),
				};
			});
	}

	async doVote(vote: bigint, @Body() body: DoVoteDto): Promise<void> {
		return prisma.votingLog
			.create({
				data: {
					member_id: null,
					voting_target_id: +body.target,
				},
			})
			.then(() => Promise.resolve());
	}

	searchInfo(vote: bigint, request: StarSearchDto): StarSearchResultListDto {
		throw new Error('Not implemented yet. Parameter: ' + vote);
	}
}
