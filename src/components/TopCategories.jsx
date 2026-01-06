import { useEffect, useState } from "react";
import api from "../api/Axios";
import BASE_URL from "../config";
import Image from "../components/Image"

const TopCategories = () => {
  const [categories, setData] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/get-categories");
      if (response.data.status) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Top Categories</h2>

      <div className="row g-4">
        {categories.map((cat) => (
          <div className="col-6 col-md-4 col-lg-2" key={cat.id}>
            <div className="card text-center h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column justify-content-center">
                <div className="fs-1 mb-2">{cat.icon ? (<Image
                      src={`${BASE_URL}/storage/${cat.icon}`} 
                      alt="icon"
                      width="80px"
                      height="80px"
                    />) : 
                    (<Image
                      src="/images/default_image.png" 
                      alt="icon"
                      width="80px"
                      height="80px"
                  />)}
                </div>
                <h6 className="card-title mb-0">{cat.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
