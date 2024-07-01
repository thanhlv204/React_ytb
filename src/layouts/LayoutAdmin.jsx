import { Link, Outlet, useNavigate } from "react-router-dom";

const LayoutAdmin = () => {
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    nav("/");
  };
  return (
    <>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Quản lý</Link>
          </li>

          <li>
            <Link to="/">Thống kê</Link>
          </li>
          <li>
            <button onClick={logout}>
              <h1 className="btn btn-primary ml-6 hover:text-black ">Logout</h1>
            </button>
          </li>
        </ul>
      </header>
      <div className="row">
        <div className="col-3">
          <div className="sidebar">
            <ul>
              <hr />
            </ul>
          </div>
        </div>
        <div className="col-9 mb-16">
          <div className="main">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
