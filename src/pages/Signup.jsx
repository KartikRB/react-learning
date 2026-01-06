import Title from "../components/Title";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useState } from "react";
import api from "../api/Axios";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    if (loading) return;
    try {
      const response = await api.post("/signup", {
          name,
          email,
          password,
          confirm_password,
      });

      toast.success(response.data.message || "You have registered yourself successfully!");

      localStorage.setItem("token", response.data.token);

      navigate("/profile");

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
    <div className="container py-5">
      <Title title="Sign Up" tagline="Create a new account and start shopping." />

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Your full name" />
                  {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter email" />
                  {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" />
                  {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                  <input type="password" className={`form-control ${errors.confirm_password ? "is-invalid" : ""}`} value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} id="confirm_password" placeholder="Confirm Password" />
                  {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password[0]}</div>}
                </div>

                <button type="submit" className="btn btn-dark w-100" disabled={loading}>Sign Up</button>

                <p className="text-center mt-3">
                  Already have an account? <Link className="text-color-primary" to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
