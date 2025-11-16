import type { Route } from "./+types/home";

import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Github App Clone" },
    { name: "description", content: "Welcome to Github App Clone!" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button variant="secondary">Click me</Button>
    </div>
  );
}
