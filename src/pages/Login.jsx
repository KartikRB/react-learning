import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import api from "../api/Axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      toast.success("You have logged in successfully!");
      if (response.data.user.role === "admin") {
        navigate("/admin");
      }else{
        navigate("/profile");
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
    <div className="container py-5">
      <Title title="Login" tagline="Welcome back! Please login to your account." />

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter email" />
                  {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`} id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                  </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="small text-color-primary">Forgot password?</Link>
                </div>

                <button type="submit" className="btn btn-dark w-100" disabled={loading}>Login</button>

                <p className="text-center mt-3">
                  Don't have an account?{" "} <Link className="text-color-primary" to="/signup">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
