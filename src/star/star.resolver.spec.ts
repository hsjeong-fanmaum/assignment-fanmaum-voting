import { Test, TestingModule } from '@nestjs/testing';
import { StarResolver } from './star.resolver';

describe('StarResolver', () => {
  let resolver: StarResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarResolver],
    }).compile();

    resolver = module.get<StarResolver>(StarResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
