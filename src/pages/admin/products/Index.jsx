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

const Products = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/get-products");
      if (response.data.status) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStatusChange = async (row) => {
    const newStatus = !row.is_active;

    setData(prev =>
      prev.map(product =>
        product.id === row.id ? { ...product, is_active: newStatus } : product
      )
    );
  
    try {
      const response1 = await api.post(`/products/${row.id}/status`, { is_active: newStatus });
      if (response1.data.status) {
        console.log(response1.data.message || "product status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setData(prev =>
        prev.map(product =>
          product.id === row.id ? { ...product, is_active: row.is_active } : product
        )
      );
    }
  };

  const handleFeaturedChange = async (row) => {
    const newStatus = !row.is_featured;

    setData(prev =>
      prev.map(product =>
        product.id === row.id ? { ...product, is_featured: newStatus } : product
      )
    );
  
    try {
      const response1 = await api.post(`/products/${row.id}/featured`, { is_featured: newStatus });
      if (response1.data.status) {
        console.log(response1.data.message || "product featured status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setData(prev =>
        prev.map(product =>
          product.id === row.id ? { ...product, is_featured: row.is_featured } : product
        )
      );
    }
  };

  const columns = [
    {
      name: "Sr No.",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    {
      name: "Primary Image",
      sortable: false,
      cell: row => (
        row.primary_image?.path ? (
          <Image
            src={`${BASE_URL}/storage/${row.primary_image?.path}`}
            alt="Primary Image"
            width="120px"
            height="80px"
          />
        ) : (<Image
              src="/images/default_product.png" 
              alt="icon"
              width="120px"
              height="80px"
              className="border border-secondary border-2"
          />)
      )
    }, 
    { id: "name", name: "Name", selector: row => row.name, sortable: true },
    { name: "Category", selector: row => row.category?.name, sortable: true },
    { name: "Stock", selector: row => (row.stock), sortable: true },
    { name: "Price", selector: row => ("$" + row.price), sortable: true },
    {
      name: "Status",
      selector: row => row.is_active,
      cell: row => (
        <div className="form-check form-switch">
          <input
            className="form-check-input "
            type="checkbox"
            checked={row.is_active}
            onChange={() => handleStatusChange(row)}
          />
        </div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Featured",
      selector: row => row.is_featured,
      cell: row => (
        <div className="form-check form-switch">
          <input
            className="form-check-input "
            type="checkbox"
            checked={row.is_featured}
            onChange={() => handleFeaturedChange(row)}
          />
        </div>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Actions",
      sortable: false,
      cell: row => (
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            className="btn btn-sm btn-warning"
            onClick={() => navigate(`/admin/products/edit/${row.id}`)}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-sm btn-danger d-none"
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
          const response = await api.delete(`/products/${id}`);
          if (response.data.status) {
            toast.success(response.data.message || "Product deleted successfully!");
            fetchProducts();
          } else {
            toast.error(response.data.message || "Product not found!");
          }
        } catch (err) {
          toast.error("Failed to delete Product");
        }
      }
    });
  };  

  const actions = [
    {icon: "add", label: "Add", onClick: () => navigate("form"), variant: "btn-outline-primary btn-sm fw-bold" },
  ];

  return (
    <div>
      <Header title="Products" actions={actions} />
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

export default Products;
