// AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8f9fa" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
