export interface GithubRepository {
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface GithubSearchResponse {
  total_count: number;
  items: GithubRepository[];
}

export interface MappedGithubResponse {
  name: string;
  fullName: string;
  stars: number;
  forks: number;
  updatedAt: string;
}
