import "@primer/react-brand/lib/css/main.css";
import "@primer/react-brand/fonts/fonts.css";

import type { Route } from "./+types/root";
import { Document } from "./document";
import { RootErrorBoundary } from "./error-boundary";
import { RootLayout } from "./root-layout";

import "./app.css";
import PrimerBrand from "@primer/react-brand";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

const { ThemeProvider } = PrimerBrand;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return <Document>{children}</Document>;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false, // don’t annoy the user
      refetchOnReconnect: true,
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

export default function RootRoute() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        colorMode="dark"
        style={{ backgroundColor: "var(--brand-color-canvas-default)" }}
      >
        <RootLayout />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export function ErrorBoundary(props: any) {
  return <RootErrorBoundary {...props} />;
}
