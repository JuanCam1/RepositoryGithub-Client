import { create, type StateCreator } from "zustand";
import {
  getDataRepositoryGithub,
  getDataUserGithub,
} from "@/services/api-service";
import type { RepositoryModel } from "@/types/repository-model";
import type { GitHubUserModel } from "@/types/user-model";

export const reposPerPage = 10;

interface RepositoryState {
  username: string;
  setUsername: (username: string) => void;
  user: GitHubUserModel | null;
  searchUser: () => void;
  repositories: RepositoryModel[];
  setRepositories: (page: number) => void;
  loading: boolean;
  error: string;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
  loadingRepos: boolean;
  handlePageChange: (page: number) => void;
}

export const createRepositroyStore: StateCreator<RepositoryState> = (
  set,
  get,
) => ({
  username: "JuanCam1",
  setUsername: (username) => set({ username }),
  user: null,
  searchUser: async () => {
    try {
      set({
        loading: true,
        error: "",
        currentPage: 1,
      });
      const userData = await getDataUserGithub(get().username);

      const totalPagesCalc = Math.ceil(userData.public_repos / reposPerPage);

      set({
        user: userData,
        totalPages: totalPagesCalc,
      });

      get().setRepositories(1);
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Error al buscar usuario",
        user: null,
        repositories: [],
        totalPages: 0,
      })
    } finally {
      set({
        loading: false,
      });
    }
  },
  repositories: [],
  setRepositories: async (page: number) => {
    try {
      set({
        loadingRepos: true,
      });

      const reposData = await getDataRepositoryGithub(page, get().username);


      set({
        repositories: reposData,
        currentPage: page,
      });
    } catch (_err) {
      set({
        error: "Error al cargar repositorios",
        repositories: [],
      })
    } finally {
      set({
        loadingRepos: false,
      });
    }
  },

  loading: false,
  error: "",
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),
  totalPages: 0,
  loadingRepos: false,
  handlePageChange: (page) => {
    if (page >= 1 && page <= get().totalPages && page !== get().currentPage) {
      get().setRepositories(page);
    }
  }
});


export const useRepositoryStore = create<RepositoryState>()(createRepositroyStore); 