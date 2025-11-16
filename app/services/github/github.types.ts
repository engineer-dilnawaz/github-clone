import { z } from "zod";

export const UserSchema = z.object({
  login: z.string(),
  id: z.number(),
  avatar_url: z.string().url(),
  bio: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  public_repos: z.number(),
});

export type User = z.infer<typeof UserSchema>;

export const RepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.string().url(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
});

export type Repo = z.infer<typeof RepoSchema>;
