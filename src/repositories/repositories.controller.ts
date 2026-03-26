import { Controller, Get, Query } from '@nestjs/common';
import { RepositoriesUseCase } from './repositories.usecase';
import { GetRepositoriesQueryDto } from './repositories.dto';

@Controller('repositories')
export class RepositoriesController {
    constructor(private readonly useCase: RepositoriesUseCase) {   
    }

    @Get()
    getRepositories(@Query() query: GetRepositoriesQueryDto) {
        return this.useCase.execute(query);
    }
}
