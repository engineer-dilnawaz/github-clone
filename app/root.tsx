import type { Route } from "./+types/root";
import { Document } from "./document";
import { RootErrorBoundary } from "./error-boundary";
import { RootLayout } from "./root-layout";

import "./app.css";

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

export default function RootRoute() {
  return <RootLayout />;
}

export function ErrorBoundary(props: any) {
  return <RootErrorBoundary {...props} />;
}
