import React from "react";
import { useNavigate} from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { isLoggedIn, logout } from "../../auth/Auth";
import { fetchUser } from "../../api/User";
import Header from "../../components/admin/Header";
import api from "../../api/Axios";
import { toast } from "react-toastify";
import ImagePreview from "../../components/ImagePreview";
import BASE_URL from "../../config";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [id, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_pass: "",
    date_of_birth: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    profile_image: null,
  });

  useEffect(() => {
    if (isLoggedIn()) {
      fetchUser()
        .then((res) => {
          const userData = res.data;
  
          setUser(userData);
          setUserId(userData.id);
  
          setFormData({
            name: userData.name ?? "",
            email: userData.email ?? "",
            phone: userData.user_detail?.phone ?? "",
            password: "",
            confirm_pass: "",
            date_of_birth: userData.user_detail?.date_of_birth ?? "",
            address_line_1: userData.user_detail?.address_line_1 ?? "",
            address_line_2: userData.user_detail?.address_line_2 ?? "",
            city: userData.user_detail?.city ?? "",
            state: userData.user_detail?.state ?? "",
            country: userData.user_detail?.country ?? "",
            zip_code: userData.user_detail?.zip_code ?? "",
            profile_image: userData.user_detail?.profile_image ?? null,
          });
        })
        .catch(() => logout());
    }
  }, []);

  if(!user){
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_image: e.target.files[0] });
  }; 
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("date_of_birth", formData.date_of_birth);
    data.append("address_line_1", formData.address_line_1);
    data.append("address_line_2", formData.address_line_2);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("country", formData.country);
    data.append("zip_code", formData.zip_code);
    if (formData.password) {
      data.append("password", formData.password);
      data.append("confirm_pass", formData.confirm_pass);
    }
    if (formData.profile_image instanceof File) {
      data.append("profile_image", formData.profile_image);
    }

    try {
      const response = await api.post(id ? "/users/" + id + "?_method=PUT" : "/users", data, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });

      if(response.status){
          toast.success(response.data.message || "User created successfully!");
      }else{
          toast.error(response.data.message || "User not found!");
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
    if (id && !(formData.profile_image instanceof File)) {
      try {
        const res = await api.delete("/users/" + id + "/remove-profile-image");
        if(res.status){
          toast.success(res.data.message || "User profile image removed successfully!");
          setFormData({ ...formData, profile_image: null });
        }else{
          toast.error(res.data.message || "User profile image not removed!");
        }
      }catch (err) {
          toast.error("Something went wrong. Try again.");
      }
    }else{
      setFormData({ ...formData, profile_image: null });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  return (
    <div>
      <Header title="Your Profile" />
  
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
                <h5 className="mt-2 mb-3 border-bottom pb-2">Personal Details</h5>
                {formData.profile_image && (
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <ImagePreview
                      imageSrc={
                        formData.profile_image instanceof File
                          ? URL.createObjectURL(formData.profile_image)
                          : `${BASE_URL}/storage/${formData.profile_image}`
                      }
                      onRemove={handleRemove}
                    />
                  </div>
                )}
                <div className="col-md-12 mb-3">
                    <label htmlFor="profile_image" className="form-label">Profile Image</label>
                    <input type="file" ref={fileInputRef} id="profile_image" name="profile_image" className={`form-control ${errors.profile_image ? "is-invalid" : ""}`} accept="image/*" onChange={handleFileChange} />
                    {errors.profile_image && <div className="invalid-feedback">{errors.profile_image[0]}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label required">Name</label>
                    <input type="text" id="name" name="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} value={formData.name} onChange={handleChange} placeholder="Enter user name" />
                    {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                </div>
    
                <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label required">Email</label>
                    <input type="text" id="email" name="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} value={formData.email} onChange={handleChange} placeholder="Enter email" />
                    {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label required">Phone</label>
                    <input type="text" id="phone" name="phone" className={`form-control ${errors.phone ? "is-invalid" : ""}`} value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
                    {errors.phone && <div className="invalid-feedback">{errors.phone[0]}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="date_of_birth" className="form-label required">Date Of Birth</label>
                    <input type="date" id="date_of_birth" name="date_of_birth" className={`form-control ${errors.date_of_birth ? "is-invalid" : ""}`} value={formData.date_of_birth} onChange={handleChange}/>
                    {errors.date_of_birth && <div className="invalid-feedback">{errors.date_of_birth[0]}</div>}
                </div>

                <h5 className="mt-5 mb-3 border-bottom pb-2">Address Information</h5>
                <div className="col-md-6 mb-3">
                    <label htmlFor="address_line_1" className="form-label required">Address Line 1</label>
                    <input type="text" id="address_line_1" name="address_line_1" className={`form-control ${errors.address_line_1 ? "is-invalid" : ""}`} value={formData.address_line_1} onChange={handleChange} placeholder="Enter address line 1" />
                    {errors.address_line_1 && <div className="invalid-feedback">{errors.address_line_1[0]}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="address_line_2" className="form-label">Address Line 2</label>
                    <input type="text" id="address_line_2" name="address_line_2" className={`form-control ${errors.address_line_2 ? "is-invalid" : ""}`} value={formData.address_line_2} onChange={handleChange} placeholder="Enter address line 2" />
                    {errors.address_line_2 && <div className="invalid-feedback">{errors.address_line_2[0]}</div>}
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="city" className="form-label required">City</label>
                    <input type="text" id="city" name="city" className={`form-control ${errors.city ? "is-invalid" : ""}`} value={formData.city} onChange={handleChange} placeholder="Enter city" />
                    {errors.city && <div className="invalid-feedback">{errors.city[0]}</div>}
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="state" className="form-label required">State</label>
                    <input type="text" id="state" name="state" className={`form-control ${errors.state ? "is-invalid" : ""}`} value={formData.state} onChange={handleChange} placeholder="Enter state" />
                    {errors.state && <div className="invalid-feedback">{errors.state[0]}</div>}
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="country" className="form-label required">Country</label>
                    <input type="text" id="country" name="country" className={`form-control ${errors.country ? "is-invalid" : ""}`} value={formData.country} onChange={handleChange} placeholder="Enter country" />
                    {errors.country && <div className="invalid-feedback">{errors.country[0]}</div>}
                </div>

                <div className="col-md-3 mb-3">
                    <label htmlFor="zip_code" className="form-label required">Zip Code</label>
                    <input type="text" id="zip_code" name="zip_code" className={`form-control ${errors.zip_code ? "is-invalid" : ""}`} value={formData.zip_code} onChange={handleChange} placeholder="Enter zip code" />
                    {errors.zip_code && <div className="invalid-feedback">{errors.zip_code[0]}</div>}
                </div>

                <h5 className="mt-5 mb-3 border-bottom pb-2">Security</h5>
                <div className="col-md-6 mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" autocomplete="new-password" id="password" name="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} value={formData.password} onChange={handleChange} placeholder="Enter password" />
                    {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="confirm_pass" className="form-label">Confirm Password</label>
                    <input type="password" id="confirm_pass" name="confirm_pass" className={`form-control ${errors.confirm_pass ? "is-invalid" : ""}`} value={formData.confirm_pass} onChange={handleChange} placeholder="Enter confirm password" />
                    {errors.confirm_pass && <div className="invalid-feedback">{errors.confirm_pass[0]}</div>}
                </div>
            </div>
            <div className="text-end">
                <button type="submit" className="btn btn-primary fw-bold" disabled={loading}>
                  {loading ? "Updating..." : "Update Profile"}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
