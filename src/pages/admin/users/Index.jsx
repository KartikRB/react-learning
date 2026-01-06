import { useEffect, useState } from "react";
import Header from "../../../components/admin/Header";
import DataTable from "react-data-table-component";
import DataTableStyle from "../../../components/admin/DataTableStyle";
import api from "../../../api/Axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/get-users");
      if (response.data.status) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      name: "Sr No.",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    { id: "name", name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    {
      name: "Actions",
      sortable: false,
      cell: row => (
        <div style={{ display: "flex", gap: "5px" }}>
          {/* Edit Button */}
          <button
            className="btn btn-sm btn-warning"
            onClick={() => navigate(`/admin/users/edit/${row.id}`)}
          >
            <i className="fa fa-pencil"></i>
          </button>

          {/* Delete Button */}
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      )
    }
  ];

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/users/${id}`);
          if (response.data.status) {
            toast.success(response.data.message || "User deleted successfully!");
            fetchUsers();
          } else {
            toast.error(response.data.message || "User not found!");
          }
        } catch (err) {
          toast.error("Failed to delete User");
        }
      }
    });
  };  

  const actions = [
    {icon: "add", label: "Add", onClick: () => navigate("form"), variant: "btn-outline-primary btn-sm fw-bold" },
  ];

  return (
    <div>
      <Header title="Users" actions={actions} />
      <div className="table-responsive">
        <DataTable
          columns={columns}
          data={data}
          customStyles={DataTableStyle()}
          pagination
          progressPending={loading}
          defaultSortFieldId="name"
          defaultSortAsc={false}
        />
      </div>
    </div>
  );
};

export default Users;
