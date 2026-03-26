import { Injectable } from '@nestjs/common';
import { GetRepositoriesQueryDto } from './repositories.dto';
import { ScoringService } from 'src/scoring/scoring.service';
import { GithubService } from 'src/github/github.service';

// keep business logic isolated
@Injectable()
export class RepositoriesUseCase {
  constructor(private readonly scoringService: ScoringService, private readonly githubService: GithubService) {
    
  }
  async execute(query: GetRepositoriesQueryDto) {
  const repos = await this.githubService.searchRepositories(query);

  const scored = repos.map((repo) => ({
    ...repo,
    score: this.scoringService.calculateScore(repo.stars, repo.forks, repo.updatedAt),
  }));

  return scored.sort((a, b) => b.score - a.score);
}
}