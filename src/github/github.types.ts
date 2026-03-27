export interface GithubRepository {
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface GithubSearchOutput {
  total_count: number;
  items: GithubRepository[];
}

export interface GithubSearchInput {
  language: string;
  createdAfter: string;
  page: number;
  limit: number;
}

export interface MappedGithubOutput {
  name: string;
  fullName: string;
  stars: number;
  forks: number;
  updatedAt: string;
}
