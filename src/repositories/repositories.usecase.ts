import { Injectable } from '@nestjs/common';
import { GetRepositoriesQueryDto } from './repositories.dto';
import { ScoringService } from '../scoring/scoring.service';
import { GithubService } from '../github/github.service';
import { MappedGithubOutput } from '../github/github.types';

type MappedGithubOutputWithScore = MappedGithubOutput & { score: number };

@Injectable()
export class RepositoriesUseCase {
  constructor(
    private readonly scoringService: ScoringService,
    private readonly githubService: GithubService,
  ) {}

  async execute(query: GetRepositoriesQueryDto) {
    const { page, limit } = query;
    const repos: MappedGithubOutput[] =
      await this.githubService.searchRepositories(query);

    const scored: MappedGithubOutputWithScore[] = repos.map(this.addScore);
    const sorted = scored.sort((a, b) => b.score - a.score);
    const paginated = this.paginate(sorted, page, limit);

    return {
      page,
      limit,
      data: paginated,
    };
  }

  private addScore = (repo: MappedGithubOutput) => ({
    ...repo,
    score: this.scoringService.calculateScore(repo),
  });

  private paginate(
    items: MappedGithubOutputWithScore[],
    page: number,
    limit: number,
  ): MappedGithubOutputWithScore[] {
    const start = (page - 1) * limit;
    const end = start + limit;

    return items.slice(start, end);
  }
}
