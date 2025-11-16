import { Outlet } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Navbar } from "~/components";

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />

      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}
