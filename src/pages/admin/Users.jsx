import { useEffect, useState } from "react";
import Header from "../../components/admin/Header";
import DataTable from "react-data-table-component";
import DataTableStyle from "../../components/admin/DataTableStyle";
import api from "../../api/Axios";

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSupportQueries = async () => {
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

    fetchSupportQueries();
  }, []);

  const columns = [
    {
      name: "Sr No.",
      cell: (row, index) => index + 1,
      width: "80px",
    },
    { id: "name", name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
  ];

  return (
    <div>
      <Header title="Users" />
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
