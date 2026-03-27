import { Module } from '@nestjs/common';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesUseCase } from './repositories.usecase';
import { ScoringService } from 'src/scoring/scoring.service';
import { HttpModule } from '@nestjs/axios';
import { GithubService } from 'src/github/github.service';
import { GithubModule } from 'src/github/github.module';
import { ScoringModule } from 'src/scoring/scoring.module';

@Module({
  imports: [HttpModule, GithubModule, ScoringModule],
  controllers: [RepositoriesController],
  providers: [RepositoriesUseCase, ScoringService, GithubService]
})
export class RepositoriesModule {}
