import axios, { type AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com",
  timeout: 10_000, // 10 seconds
  headers: {
    Accept: "application/vnd.github+json",
  },
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const normalizedError = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    };

    return Promise.reject(normalizedError);
  }
);

api.interceptors.response.use((response) => {
  const remaining = response.headers["x-ratelimit-remaining"];

  if (remaining && Number(remaining) < 10) {
    console.warn("⚠️ GitHub API rate limit is nearly exhausted!");
  }

  return response;
});

function axiosResponseAdapter(response: AxiosResponse) {
  return {
    data: response.data,
    ok: response.status >= 200 && response.status < 300,
    status: response.status,
  } as unknown as AxiosResponse;
}

api.interceptors.response.use((response) => axiosResponseAdapter(response));
