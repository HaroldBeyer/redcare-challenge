import { Test, TestingModule } from '@nestjs/testing';
import { ScoringService } from './scoring.service';

describe('ScoringService', () => {
  let service: ScoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoringService],
    }).compile();

    service = module.get<ScoringService>(ScoringService);
  });

  it('should calculate higher score for more stars', () => {
    const repoA = {
      stars: 100,
      forks: 10,
      updatedAt: new Date().toISOString(),
    };
    const repoB = { stars: 10, forks: 10, updatedAt: new Date().toISOString() };

    expect(service.calculateScore(repoA)).toBeGreaterThan(
      service.calculateScore(repoB),
    );
  });
});
