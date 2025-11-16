import { api } from "~/lib/axios";

export const githubApi = {
  getUser: (username: string) =>
    api.get(`/users/${username}`).then((res) => res.data),

  getUserRepos: (username: string) =>
    api.get(`/users/${username}/repos`).then((res) => res.data),

  searchRepos: (query: string) =>
    api
      .get("/search/repositories", {
        params: { q: query },
      })
      .then((res) => res.data),
};
