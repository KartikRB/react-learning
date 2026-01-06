import { useEffect, useState } from "react";
import Header from "../../components/admin/Header";
import DataTable from "react-data-table-component";
import DataTableStyle from "../../components/admin/DataTableStyle";
import api from "../../api/Axios";

const Inquiries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSupportQueries = async () => {
      setLoading(true);
      try {
        const response = await api.get("/get-support-queries");
        if (response.data.status) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching support queries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupportQueries();
  }, []);

  const columns = [
    {
      name: "Sr No.",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    {
      name: "Type",
      selector: row => row.type,
      cell: row => (
        <span
          className={`badge rounded-pill ${
            row.type === "contact"
              ? "bg-primary"
              : "bg-danger"
          }`}
        >
          {row.type}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Issue Type",
      selector: row => row.issue_type ?? "",
      cell: row => row.issue_type || "-",
      sortable: true,
    },    
    { name: "Subject", selector: row => row.subject },
    { name: "Description", selector: row => row.description },
    { 
      id: "created_at",
      name: "Date",
      selector: row => new Date(row.created_at).getTime(),
      cell: row => {
        const date = new Date(row.created_at);
        return date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      },      
      sortable: true,
    }
  ];
  

  return (
    <div>
      <Header title="Inquiries" />
      <div className="table-responsive">
        <DataTable
          columns={columns}
          data={data}
          customStyles={DataTableStyle()}
          pagination
          progressPending={loading}
          defaultSortFieldId="created_at"
          defaultSortAsc={false}
        />
      </div>
    </div>
  );
};

export default Inquiries;
