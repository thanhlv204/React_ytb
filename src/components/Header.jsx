import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.user?.email;
  const logout = () => {
    localStorage.removeItem("user");
    nav("/login");
  };
  return (
    <header>
      <ul>
        <li>
          <Link className="font-bold" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/products">Shop</Link>
        </li>
        {email ? (
          <li>
            {email}
            <button onClick={logout}>
              <h1 className="btn btn-primary ml-6 hover:text-black ">Logout</h1>
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
