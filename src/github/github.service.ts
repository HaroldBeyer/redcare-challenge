import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  GithubRepository,
  GithubSearchResponse,
  MappedGithubResponse,
} from './github.types';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  async searchRepositories(params: {
    language: string;
    createdAfter: string;
    page: number;
    limit: number;
  }) {
    const { language, createdAfter, page, limit } = params;

    const query = `language:${language} created:>${createdAfter}`;

    const url = 'https://api.github.com/search/repositories';

    try {
      const response = await firstValueFrom(
        this.httpService.get<GithubSearchResponse>(url, {
          params: {
            q: query,
            sort: 'stars',
            order: 'desc',
            page,
            per_page: limit,
          },
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        }),
      );

      return this.mapResponse(response.data.items);
    } catch (error) {
      if (error.response?.status === 403) {
        throw new HttpException(
          'GitHub API rate limit exceeded',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      throw new HttpException(
        'Failed to fetch repositories from GitHub',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  private mapResponse(items: GithubRepository[]): MappedGithubResponse[] {
    return items.map((item) => ({
      name: item.name,
      fullName: item.full_name,
      stars: item.stargazers_count,
      forks: item.forks_count,
      updatedAt: item.updated_at,
    }));
  }
}
