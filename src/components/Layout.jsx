import { Outlet } from "react-router-dom";
import Header from "./Header/index";
export const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mt-10">
        <Outlet />
      </main>
    </div>
  );
};
