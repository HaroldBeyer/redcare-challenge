import { Module } from '@nestjs/common';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesUseCase } from './repositories.usecase';

@Module({
  controllers: [RepositoriesController],
  providers: [RepositoriesUseCase]
})
export class RepositoriesModule {}
