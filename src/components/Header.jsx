import reactLogo from '../assets/react.svg'
import Image from './Image'
import { NavLink , useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import { isLoggedIn, logout } from "../auth/Auth";
import { fetchUser } from "../api/User";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      fetchUser()
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between border-bottom bg-dark">
      <NavLink to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <Image src={reactLogo} className="logo react" alt="React logo"/>
      </NavLink>

      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link px-2 active" : "nav-link px-2 link-light"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/shop" 
            className={({ isActive }) => isActive ? "nav-link px-2 active" : "nav-link px-2 link-light"}
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? "nav-link px-2 active" : "nav-link px-2 link-light"}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? "nav-link px-2 active" : "nav-link px-2 link-light"}
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <div className="col-md-3 text-end me-3">
      {!isLoggedIn() ? (
          <>
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </>
        ) : user && (
          <div className='d-flex justify-content-end align-items-center'>
            <a href="#" className="text-light me-4 fs-4">
              <i className='fa fa-heart'></i>
            </a>
            <a href="#" className="text-light me-4 fs-4">
              <i className='fa fa-shopping-cart'></i>
            </a>
            <div className="flex-shrink-0 dropdown">
              <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="/images/default_user.png" width="32" height="32" className="rounded-circle bg-light" alt="User"/>
              </a>
              <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                <li><button className="dropdown-item" onClick={() => navigate("/profile")}><i className='fa fa-user-circle me-2'></i> My Profile</button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button type='button' className="dropdown-item text-danger" onClick={handleLogout}>Sign Out</button></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
