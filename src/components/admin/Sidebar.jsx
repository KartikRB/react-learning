// Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import reactLogo from '../../assets/react.svg';
import Image from '../Image';
import { logout } from "../../auth/Auth";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column p-3 bg-light border-end border-gray"
      style={{ width: "280px", minHeight: "100vh" }}
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
          <Image
            src="/images/default_user.png"
            width={32}
            height={32}
            className="rounded-circle bg-light me-2"
            alt="User"
          />
          <strong className="text-light">Admin</strong>
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