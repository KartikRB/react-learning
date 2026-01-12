import { useEffect, useState } from "react";
import Header from "../../../components/admin/Header";
import DataTable from "react-data-table-component";
import DataTableStyle from "../../../components/admin/DataTableStyle";
import api from "../../../api/Axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Faqs = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/get-faqs");
      if (response.data.status) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching faqs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleStatusChange = async (row) => {
    const newStatus = !row.is_active;

    setData(prev =>
      prev.map(faq =>
        faq.id === row.id ? { ...faq, is_active: newStatus } : faq
      )
    );
  
    try {
      const response1 = await api.post(`/faqs/${row.id}/status`, { is_active: newStatus });
      if (response1.data.status) {
        console.log(response1.data.message || "Faq status updated successfully!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setData(prev =>
        prev.map(faq =>
          faq.id === row.id ? { ...faq, is_active: row.is_active } : faq
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
    { name: "Question", selector: row => row.question, sortable: true },
    { name: "answer", selector: row => row.answer, sortable: true },
    { id: "order", name: "order", selector: row => row.order, sortable: true },
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
      name: "Actions",
      sortable: false,
      cell: row => (
        <div style={{ display: "flex", gap: "5px" }}>
          {/* Edit Button */}
          <button
            className="btn btn-sm btn-warning"
            onClick={() => navigate(`/admin/faqs/edit/${row.id}`)}
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
          const response = await api.delete(`/faqs/${id}`);
          if (response.data.status) {
            toast.success(response.data.message || "Faq deleted successfully!");
            fetchFaqs();
          } else {
            toast.error(response.data.message || "Faq not found!");
          }
        } catch (err) {
          toast.error("Failed to delete Faq");
        }
      }
    });
  };  

  const actions = [
    {icon: "add", label: "Add", onClick: () => navigate("form"), variant: "btn-outline-primary btn-sm fw-bold" },
  ];

  return (
    <div>
      <Header title="Faqs" actions={actions} />
      <div className="table-responsive">
        <DataTable
          columns={columns}
          data={data}
          customStyles={DataTableStyle()}
          pagination
          progressPending={loading}
          defaultSortFieldId="order"
          defaultSortAsc={true}
        />
      </div>
    </div>
  );
};

export default Faqs;
