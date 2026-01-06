import React from "react";
import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import { isLoggedIn, logout } from "../../auth/Auth";
import { fetchUser } from "../../api/User";
import Header from "../../components/admin/Header";
import Image from "../../components/Image";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      fetchUser()
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <Header title="Users"/>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            {/* Card Header */}
            <div className="card-body bg-dark text-white text-center rounded">
              <div className="d-flex flex-column align-items-center">
                <Image src="/images/default_user.png" width={80} height={80} className="rounded-circle bg-light" alt="User" />
                <h5 className="mb-0 text-color-primary">{user.name}</h5>
                <small className="text-light">{user.email}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
