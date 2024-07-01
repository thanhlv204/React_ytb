import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const LayoutClient = () => {
  return (
    <>
      <Header />
      <main className="main mb-16">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutClient;
