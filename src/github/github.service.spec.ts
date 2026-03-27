import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('GithubService', () => {
  let service: GithubService;
  let httpService: HttpService;

  const mockResponse = {
    data: {
      items: [
        {
          name: 'repo-1',
          full_name: 'user/repo-1',
          stargazers_count: 100,
          forks_count: 50,
          updated_at: '2024-01-01T00:00:00Z',
        },
      ],
    },
  };

  const httpServiceMock = {
    get: jest.fn(() => of(mockResponse)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubService,
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();

    service = module.get<GithubService>(GithubService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch and map repositories', async () => {
    const result = await service.searchRepositories({
      language: 'typescript',
      createdAfter: '2023-01-01',
      page: 1,
      limit: 10,
    });

    expect(httpService.get).toHaveBeenCalled();

    expect(result).toEqual([
      {
        name: 'repo-1',
        fullName: 'user/repo-1',
        stars: 100,
        forks: 50,
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ]);
  });
});