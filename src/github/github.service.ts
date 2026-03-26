import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

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

    const response = await firstValueFrom(
      this.httpService.get(url, {
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
  }

  private mapResponse(items: any[]) {
    return items.map((item) => ({
      name: item.name,
      fullName: item.full_name,
      stars: item.stargazers_count,
      forks: item.forks_count,
      updatedAt: item.updated_at,
    }));
  }
}