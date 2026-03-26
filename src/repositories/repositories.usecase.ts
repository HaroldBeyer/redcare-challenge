import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoriesUseCase {
  async execute() {
    // por enquanto mock
    return [
      {
        name: 'repo-1',
        stars: 100,
        forks: 50,
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ];
  }
}