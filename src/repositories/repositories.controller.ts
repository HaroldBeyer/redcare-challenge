import { Controller, Get } from '@nestjs/common';
import { RepositoriesUseCase } from './repositories.usecase';

@Controller('repositories')
export class RepositoriesController {
    constructor(private readonly useCase: RepositoriesUseCase) {   
    }

    @Get()
    getRepositories() {
        return this.useCase.execute();
    }
}
