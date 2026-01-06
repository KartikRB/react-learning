import Title from "../components/Title";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

  return (
    <div className="container py-5">
      <Title title="Forgot Password" tagline="Enter your email below to reset your password." />

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5 my-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <form>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="abc@example.com" />
                </div>
                <button type="button" className="btn btn-dark w-100">Send Reset Link</button>
                <p className="text-center mt-3">
                    <Link to="/login" className="text-color-primary">Back to Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
