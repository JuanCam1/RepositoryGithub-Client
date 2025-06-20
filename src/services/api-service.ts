import { reposPerPage } from "@/store/repository-store";
import type { RepositoryModel } from "@/types/repository-model";
import type { GitHubUserModel } from "@/types/user-model";


export const getDataUserGithub = async (username: string): Promise<GitHubUserModel> => {
  const userResponse = await fetch(
    `https://api.github.com/users/${username}`,
  );
  if (!userResponse.ok) {
    throw new Error("Usuario no encontrado");
  }
  const userData = await userResponse.json();

  return userData;
}


export const getDataRepositoryGithub = async (page: number, username: string): Promise<RepositoryModel[]> => {
  const repositoryResponse = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=${reposPerPage}&page=${page}`,
  );
  if (!repositoryResponse.ok) {
    throw new Error("Usuario no encontrado");
  }
  const repositoryData = await repositoryResponse.json();

  return repositoryData;
}

