import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Member, Star, Vote, VotingLog } from './vote/vote.model';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
	constructor(private configService: ConfigService) {}

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: 'mysql',
			host: this.configService.get<string>('DB_HOST'),
			port: +(this.configService.get<string>('DB_PORT') || 3306),
			username: this.configService.get<string>('DB_USERNAME'),
			password: this.configService.get<string>('DB_PASSWORD'),
			database: this.configService.get<string>('DB_DATABASE'),
			entities: [Member, Vote, Star, VotingLog],
			synchronize: true,
			logging: true,
		};
	}
}
