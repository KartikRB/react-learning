import { useState, useEffect } from "react";
import Header from "../../../components/admin/Header";
import api from "../../../api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Form = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const actions = [
    { label: "Back", onClick: () => navigate("/admin/categories") },
  ];

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    icon: null,
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/get-categories/${id}`)
        .then(res => {
            if(res.status){
                console.log(res);
                const category = res.data.data;
                setFormData({
                    name: category.name,
                    slug: category.slug,
                    description: category.description,
                    icon: null,
                });
            }
        })
        .catch(() => toast.error("Failed to load category"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    setFormData({ ...formData, icon: e.target.files[0] });
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("description", formData.description);
    if (formData.icon) {
      data.append("icon", formData.icon);
    }

    try {
        const response = await api.post(id ? "/add-product-category/" + id : "/add-product-category", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if(response.status){
            toast.success(response.data.message || "Category created successfully!");

            setFormData({ name: "", slug: "", description: "", icon: null });
    
            navigate("/admin/categories");
        }else{
            toast.error(response.data.message || "Category not found!");
        }
    } catch (err) {
        if (err.response?.status === 422) {
            setErrors(err.response.data.errors);
        } else {
            toast.error("Something went wrong. Try again.");
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <Header title={id ? "Edit Category" : "Create Category"} actions={actions} />
  
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="icon" className="form-label">Icon (Image)</label>
                    <input type="file" id="icon" name="icon" className={`form-control ${errors.icon ? "is-invalid" : ""}`} accept="image/*" onChange={handleFileChange} />
                    {errors.icon && <div className="invalid-feedback">{errors.icon[0]}</div>}
                </div>

                <div className="col-md-4 mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" name="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} value={formData.name} onChange={handleChange} placeholder="Enter category name" />
                    {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                </div>
    
                <div className="col-md-4 mb-3">
                    <label htmlFor="slug" className="form-label">Slug</label>
                    <input type="text" id="slug" name="slug" className={`form-control ${errors.slug ? "is-invalid" : ""}`} value={formData.slug} onChange={handleChange} placeholder="Enter slug (e.g., electronics)" />
                    {errors.slug && <div className="invalid-feedback">{errors.slug[0]}</div>}
                </div>
    
                <div className="col-md-12 mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" name="description" className={`form-control ${errors.description ? "is-invalid" : ""}`} value={formData.description} onChange={handleChange} placeholder="Optional description..." rows={4} />
                    {errors.description && <div className="invalid-feedback">{errors.description[0]}</div>}
                </div>
            </div>
            <div className="text-end">
                <button type="submit" className="btn btn-dark" disabled={loading}>
                    {id ? "Update" : "Create"}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Form;