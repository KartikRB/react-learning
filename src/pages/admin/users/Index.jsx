import { useEffect, useState } from "react";
import Header from "../../../components/admin/Header";
import DataTable from "react-data-table-component";
import DataTableStyle from "../../../components/admin/DataTableStyle";
import api from "../../../api/Axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Image from "../../../components/Image"
import BASE_URL from "../../../config";

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
    {
      name: "Profile Image",
      sortable: false,
      cell: row => (
        row.user_detail?.profile_image ? (
          <Image
            src={`${BASE_URL}/storage/${row.user_detail?.profile_image}`}
            alt="profile_image"
            width="50px"
            height="50px"
            className="rounded-circle"
            style={{objectFit: "cover"}}
          />
        ) : (<Image
              src="/images/default_user.png" 
              alt="icon"
              width="50px"
              height="50px"
              className="rounded-circle border border-dark border-2"
              style={{objectFit: "cover"}}
          />)
      )
    }, 
    { id: "name", name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Phone", selector: row => row.user_detail?.phone ?? "", sortable: true },
    {
      name: "Date Of Birth",
      selector: row => new Date(row.user_detail?.date_of_birth).getTime(),
      cell: row => {
        if (row.user_detail?.date_of_birth) {
          const date = new Date(row.user_detail.date_of_birth);
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
        }
        return ""; // return empty string if no date
      },
      sortable: true,
    },
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
          defaultSortAsc={true}
        />
      </div>
    </div>
  );
};

export default Users;
