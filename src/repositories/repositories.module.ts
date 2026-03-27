import { Module } from '@nestjs/common';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesUseCase } from './repositories.usecase';
import { ScoringService } from '../scoring/scoring.service';
import { HttpModule } from '@nestjs/axios';
import { GithubService } from '../github/github.service';
import { GithubModule } from '../github/github.module';
import { ScoringModule } from '../scoring/scoring.module';

@Module({
  imports: [HttpModule, GithubModule, ScoringModule],
  controllers: [RepositoriesController],
  providers: [RepositoriesUseCase, ScoringService, GithubService],
})
export class RepositoriesModule {}
