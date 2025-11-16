import { useQuery } from "@tanstack/react-query";
import { githubApi } from "./github.api";
import { UserSchema, RepoSchema } from "./github.types";

export function useUser(username: string) {
  return useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const data = await githubApi.getUser(username);
      return UserSchema.parse(data); // ← Zod validation
    },
    enabled: !!username,
  });
}

export function useUserRepos(username: string) {
  return useQuery({
    queryKey: ["repos", username],
    queryFn: async () => {
      const data = await githubApi.getUserRepos(username);
      return RepoSchema.array().parse(data); // ← Zod validation
    },
    enabled: !!username,
  });
}

export function useSearchRepos(query: string) {
  return useQuery({
    queryKey: ["search-repos", query],
    queryFn: async () => githubApi.searchRepos(query),
    enabled: query.length > 2,
  });
}
