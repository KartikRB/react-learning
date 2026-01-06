import { useEffect, useState } from "react";
import Header from "../../../components/admin/Header";
import DataTable from "react-data-table-component";
import DataTableStyle from "../../../components/admin/DataTableStyle";
import api from "../../../api/Axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../config";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Categories = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get("/get-categories");
      if (response.data.status) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchCategories();
  }, []);  

  const actions = [
    { label: "Add Category", onClick: () => navigate("form") },
  ];

  const columns = [
    {
      name: "Sr No.",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Icon",
      sortable: false,
      cell: row => (
        row.icon ? (
          <img
            src={`${BASE_URL}/storage/${row.icon}`}  // use the base URL
            alt="icon"
            style={{ width: 40, height: 40, objectFit: "cover" }}
          />
        ) : null
      )
    },  
    { id: "name", name: "Name", selector: row => row.name, sortable: true },
    { name: "Slug", selector: row => row.slug, sortable: true },
    { name: "Description", selector: row => row.description, sortable: true },
    {
      name: "Actions",
      sortable: false,
      cell: row => (
        <div style={{ display: "flex", gap: "5px" }}>
          {/* Edit Button */}
          <button
            className="btn btn-sm btn-warning"
            onClick={() => navigate(`/admin/categories/edit/${row.id}`)}
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
          const response = await api.delete(`/delete-product-category/${id}`);
          if (response.data.status) {
            toast.success(response.data.message || "Category deleted successfully!");
            fetchCategories();
          } else {
            toast.error(response.data.message || "Category not found!");
          }
        } catch (err) {
          toast.error("Failed to delete category");
        }
      }
    });
  };  

  return (
    <div>
      <Header title="Categories" actions={actions} />
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

export default Categories;
