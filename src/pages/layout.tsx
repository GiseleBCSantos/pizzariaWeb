import { Outlet } from "react-router";
import { Navbar } from "../ui/navbar";

const Layout = () => {
  return (
    <div className="app">
      <div className="pedido-background"></div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export { Layout };
