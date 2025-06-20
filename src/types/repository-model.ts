export interface RepositoryModel {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  updated_at: string;
  topics: string[];
  visibility: string,
}