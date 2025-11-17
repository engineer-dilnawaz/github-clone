import { Outlet } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}
