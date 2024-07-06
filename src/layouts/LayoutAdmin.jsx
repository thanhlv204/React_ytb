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
      <div className="row ">
        <h1 className="text-3xl font-bold ml-3"> Hello Admin</h1>
        <div className="col-3">
          <div className="sidebar bg-gray-100 p-4 rounded">
            <ul>
              <li>
                <Link to="/admin">Dashboard</Link>
              </li>
              <li>
                <Link to="/">Product Management</Link>
              </li>
              <li>
                <Link to="/">About</Link>
              </li>
              <hr />
              <div>
                <p className="font-bold">Filters</p>
                <div className="filter-group">
                  <label>
                    <input type="checkbox" name="electronics" />
                    Electronics
                  </label>
                </div>
                <div className="filter-group">
                  <label>
                    <input type="checkbox" name="clothing" />
                    Clothing
                  </label>
                </div>
                <div className="filter-group">
                  <label>
                    <input type="checkbox" name="home-appliances" />
                    Home Appliances
                  </label>
                </div>
                <div className="filter-group">
                  <label>
                    <input type="checkbox" name="books" />
                    Books
                  </label>
                </div>
              </div>
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
