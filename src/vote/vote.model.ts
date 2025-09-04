import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('Member')
export class Member {
	@PrimaryGeneratedColumn()
	id: bigint;

	@Column({ unique: true, nullable: false })
	loginId: string;

	@Column({ nullable: false })
	credential: string;
}

@Entity('Star')
export class Star {
	@PrimaryGeneratedColumn()
	id: bigint;

	@Column({ nullable: false })
	name: string;

	@Column()
	profileImageUrl: string;
}

@Entity('Vote')
export class Vote {
	@PrimaryGeneratedColumn()
	id: bigint;

	@ManyToOne(() => Member)
	@JoinColumn({ name: 'member_id' })
	member: Member;

	@ManyToOne(() => Star)
	@JoinColumn({ name: 'star_id' })
	star: Star;
}

@Entity('VotingLog')
export class VotingLog {
	@PrimaryGeneratedColumn()
	id: bigint;

	@ManyToOne(() => Member)
	@JoinColumn({ name: 'member_id' })
	member: Member;

	@ManyToOne(() => Star)
	@JoinColumn({ name: 'star_id' })
	star: Star;

	@Column({ default: true })
	alive: boolean;

	@CreateDateColumn()
	voted: Date;

	@UpdateDateColumn()
	modified: Date;
}
