import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser } from "../api/User";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetchUser()
      .then((res) => {
        if (res.data.role === "admin") {
          setIsAdmin(true);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Checking permissions...</div>;

  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
