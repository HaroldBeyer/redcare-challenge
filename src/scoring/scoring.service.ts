import { Injectable } from '@nestjs/common';
import { CalculateScoreInputDTO } from './scoring.dto';

@Injectable()
export class ScoringService {
    // Those could be fetched from somewhere else. E.G as env variables being loaded on initialization, coming from a cloud service.
    // So it could be modifiable without having to edit the code logic in itself.
    private readonly starsWeight = 0.6;
    private readonly forksWeight = 0.3;
    private readonly recencyWeight = 0.1;

    // Those input variables (stars, forks, etc) could be added to a DTO, so it would be easier to read. But let's focus on simplicity here
    calculateScore(repo: CalculateScoreInputDTO
    ): number {
        const {updatedAt, stars, forks} = repo
        const recencyScore = this.calculateRecencyScore(updatedAt);

        const score =
            stars * this.starsWeight +
            forks * this.forksWeight +
            recencyScore * this.recencyWeight;

        return Number(score.toFixed(2));
    }

    /**
     * Calculates the time since the last update on the repository
     * @param updatedAt 
     * @returns score
     */
    private calculateRecencyScore(updatedAt: string): number {
        const now = new Date().getTime();
        const updated = new Date(updatedAt).getTime();

        const days = (now - updated) / (1000 * 60 * 60 * 24);

        return 1 / (1 + days);
    }
}
