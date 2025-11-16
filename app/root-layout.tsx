import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="min-h-screen">
      {/* Navbar goes here */}
      <Outlet />
    </div>
  );
}
