import type { Route } from "./+types/home";
import { Button, HStack } from "@chakra-ui/react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Github App Clone" },
    { name: "description", content: "Welcome to Github App Clone!" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <HStack>
        <Button>Click me</Button>
        <Button>Click me</Button>
      </HStack>
    </div>
  );
}
