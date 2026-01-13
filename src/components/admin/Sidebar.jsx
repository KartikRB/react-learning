// Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import reactLogo from '../../assets/react.svg';
import Image from '../Image';
import { isLoggedIn, logout } from "../../auth/Auth";
import { fetchUser } from "../../api/User";
import BASE_URL from "../../config";

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (isLoggedIn()) {
      fetchUser()
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => logout());
    }
  }, []);

  return (
    <div
      className="d-flex flex-column p-3 bg-light border-end border-gray sticky-top vh-100"
      style={{ width: "280px", transition: "all 0.3s" }}
    >
      <Image src={reactLogo} height={75} alt="React logo" className="mb-3" />
      
      <hr className="mt-0" />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/admin/"
            end
            className={({ isActive }) =>
              `nav-link mb-2 ${isActive ? "active" : "link-dark"}`
            }
          >
            <i className="fa fa-house me-2"></i> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `nav-link mb-2 ${isActive ? "active" : "link-dark"}`
            }
          >
           <i className="fa fa-users me-2"></i> Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `nav-link mb-2 ${isActive ? "active" : "link-dark"}`
            }
          >
           <i className="fa fa-shopping-bag me-2"></i> Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `nav-link mb-2 ${isActive ? "active" : "link-dark"}`
            }
          >
           <i className="fa fa-box me-2"></i> Categories
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/faqs"
            className={({ isActive }) =>
              `nav-link mb-2 ${isActive ? "active" : "link-dark"}`
            }
          >
           <i className="fa fa-question me-2"></i> Faq's
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/calculator"
            className={({ isActive }) =>
              `nav-link mb-2 ${isActive ? "active" : "link-dark"}`
            }
          >
           <i className="fa fa-calculator me-2"></i> Calculator
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/games"
            className={({ isActive }) =>
              `nav-link mb-2 ${isActive ? "active" : "link-dark"}`
            }
          >
           <i className="fa fa-dragon me-2"></i> Games
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/inquiries"
            className={({ isActive }) =>
              `nav-link mb-2 ${isActive ? "active" : "link-dark"}`
            }
          >
           <i className="fa fa-question-circle me-2"></i> Inquiries
          </NavLink>
        </li>
      </ul>

      <div className="dropdown mt-auto">
        <a
          href="#"
          className="d-flex align-items-center link-dark text-decoration-none bg-dark p-2 rounded"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
         {user?.user_detail?.profile_image ? (<Image
            src={`${BASE_URL}/storage/${user.user_detail.profile_image}`}
            width={32}
            height={32}
            className="rounded-circle bg-light me-2"
            alt="User"
          />) : (<Image
            src="/images/default_user.png"
            width={32}
            height={32}
            className="rounded-circle bg-light me-2"
            alt="User"
          />)}
          <div>
            <strong className="text-light">{user?.name ?? "User"}</strong><br />
            <small className="text-color-primary text-uppercase fw-bold">{user?.role ?? "User"}</small>
          </div>
        </a>
        <ul className="dropdown-menu text-small shadow">
          <li>
            <NavLink className="dropdown-item" to="/admin/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button
              type="button"
              className="dropdown-item text-danger"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;