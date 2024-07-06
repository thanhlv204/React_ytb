import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const LayoutClient = () => {
  return (
    <>
      <div>
        <Header />
        <main className="main mb-16 ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default LayoutClient;
