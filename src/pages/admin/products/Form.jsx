import { useState, useEffect, useRef } from "react";
import Header from "../../../components/admin/Header";
import api from "../../../api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ImagePreview from "../../../components/ImagePreview";
import BASE_URL from "../../../config";
import ProductImageIndex from "./partials/ProductImagesIndex"

const Form = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const [categories, setcategories] = useState([]);

  const actions = [
    { label: "Back", onClick: () => navigate("/admin/products"), variant: "btn-outline-primary btn-sm fw-bold" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    price: "",
    stock: "",
    short_description: "",
    description: "",
    primary_image: null,
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/get-categories");
      if (response.data.status) {
        setcategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/products/${id}`)
        .then(res => {
            if(res.status){
              const product = res.data.data;
              setFormData({
                name: product.name ?? "",
                category_id: product.category_id ?? "",
                price: product.price ?? "",
                stock: product.stock ?? "",
                short_description: product.short_description ?? "",
                description: product.description ?? "",
                primary_image: product.primary_image?.path ?? null,
              });
              
            }
        })
        .catch(() => toast.error("Failed to load product"))
        .finally(() => setLoading(false));
    }
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    setFormData({ ...formData, primary_image: e.target.files[0] });
  }; 
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category_id", formData.category_id);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("short_description", formData.short_description);
    data.append("description", formData.description);
    
    if (formData.primary_image instanceof File) {
      data.append("primary_image", formData.primary_image);
    }

    try {
      const response = await api.post(id ? "/products/" + id + "?_method=PUT" : "/products", data, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });

      if(response.status){
          toast.success(response.data.message || "Product created successfully!");

          setFormData({ name: "", category_id: "", price: "", stock: "", short_description: "", description: "", primary_image: null });
  
          navigate("/admin/products");
      }else{
          toast.error(response.data.message || "Product not found!");
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

  const handleRemove = async (e) => {
    e.preventDefault();
    if (id && !(formData.primary_image instanceof File)) {
      try {
        const res = await api.delete("/products/" + id + "/remove-product-image");
        if(res.status){
          toast.success(res.data.message || "Product primary image removed successfully!");
          setFormData({ ...formData, primary_image: null });
        }else{
          toast.error(res.data.message || "Product primary image not removed!");
        }
      }catch (err) {
          toast.error("Something went wrong. Try again.");
      }
    }else{
      setFormData({ ...formData, primary_image: null });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  return (
    <div>
      <Header title={id ? "Edit Product" : "Create Product"} actions={actions} />
  
      <div className="card shadow-sm">
        <div className="card-body">
        {formData.primary_image && (
          <div className="d-flex justify-content-center align-items-center mb-3">
            <ImagePreview
              imageSrc={
                formData.primary_image instanceof File
                  ? URL.createObjectURL(formData.primary_image)
                  : `${BASE_URL}/storage/${formData.primary_image}`
              }
              // onRemove={handleRemove}
            />
          </div>
        )}
          <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <label htmlFor="primary_image" className={`form-label ${id ? "" : "required"}`}>Primary Image</label>
                    <input type="file" ref={fileInputRef} id="primary_image" name="primary_image" className={`form-control ${errors.primary_image ? "is-invalid" : ""}`} accept="image/*" onChange={handleFileChange} />
                    {errors.primary_image && <div className="invalid-feedback">{errors.primary_image[0]}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="category_id" className="form-label required">Category</label>
                    <select name="category_id" id="category_id" className={`form-select ${errors.category_id ? "is-invalid" : ""}`} value={formData.category_id} onChange={handleChange}>
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    {errors.category_id && <div className="invalid-feedback">{errors.category_id[0]}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label required">Name</label>
                    <input type="text" id="name" name="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} value={formData.name} onChange={handleChange} placeholder="Enter product name" />
                    {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label required">Price</label>
                    <input type="text" id="price" name="price" className={`form-control ${errors.price ? "is-invalid" : ""}`} value={formData.price} onChange={handleChange} placeholder="Enter product price" />
                    {errors.price && <div className="invalid-feedback">{errors.price[0]}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="stock" className="form-label required">Stock</label>
                    <input type="text" id="stock" name="stock" className={`form-control ${errors.stock ? "is-invalid" : ""}`} value={formData.stock} onChange={handleChange} placeholder="Enter product stock" />
                    {errors.stock && <div className="invalid-feedback">{errors.stock[0]}</div>}
                </div>

                <div className="col-md-12 mb-3">
                    <label htmlFor="short_description" className="form-label required">Short Description</label>
                    <textarea id="short_description" name="short_description" className={`form-control ${errors.short_description ? "is-invalid" : ""}`} value={formData.short_description} onChange={handleChange} placeholder="Discribe product shortly." rows={2} />
                    {errors.short_description && <div className="invalid-feedback">{errors.short_description[0]}</div>}
                </div>

                <div className="col-md-12 mb-3">
                    <label htmlFor="description" className="form-label required">Description</label>
                    <textarea id="description" name="description" className={`form-control ${errors.description ? "is-invalid" : ""}`} value={formData.description} onChange={handleChange} placeholder="Discribe product shortly." rows={5} />
                    {errors.description && <div className="invalid-feedback">{errors.description[0]}</div>}
                </div>
            </div>
            <div className="text-end">
                <button type="submit" className="btn btn-primary fw-bold" disabled={loading}>
                    {id ? "Update" : "Create"}
                </button>
            </div>
          </form>

          {id && (
            <>
              <hr className="my-4" />
              <div>
                <h4 className="mb-3">Product Images</h4>
                <ProductImageIndex productId={id} />
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
  
};

export default Form;