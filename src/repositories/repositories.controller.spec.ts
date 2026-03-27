import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesUseCase } from './repositories.usecase';

describe('RepositoriesController', () => {
  let controller: RepositoriesController;

  const mockUseCase = {
    execute: jest.fn().mockResolvedValue({
      page: 1,
      limit: 10,
      data: [],
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [
        { provide: RepositoriesUseCase, useValue: mockUseCase },
      ],
    }).compile();

    controller = module.get<RepositoriesController>(RepositoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call usecase and return result', async () => {
    const query = {
      language: 'ts',
      createdAfter: '2023-01-01',
      page: 1,
      limit: 10,
    };

    const result = await controller.getRepositories(query as any);

    expect(mockUseCase.execute).toHaveBeenCalledWith(query);
    expect(result).toEqual({
      page: 1,
      limit: 10,
      data: [],
    });
  });
});