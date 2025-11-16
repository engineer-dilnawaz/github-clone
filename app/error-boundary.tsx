import { isRouteErrorResponse } from "react-router";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

export function RootErrorBoundary({ error }: { error: Error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="bg-primary h-screen w-screen flex flex-col items-center justify-center text-white gap-4">
      <div className="flex gap-2">
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </div>
      <Link to="/">
        <Button variant="secondary">Home</Button>
      </Link>
    </main>
  );
}
