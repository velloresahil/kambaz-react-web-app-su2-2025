import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="container mt-4">
      <div className="mx-auto" style={{ maxWidth: "400px" }}>
       
        <h3 className="text-center mb-4">Sign In</h3>

     
        <form>
          <div className="mb-3">
            <input
              placeholder="Username"
              id="wd-username"
              className="form-control"
              type="text"
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Password"
              id="wd-password"
              className="form-control"
              type="password"
            />
          </div>

          <div className="d-grid">
            <Link
              to="/Kambaz/Dashboard"
              id="wd-signin-btn"
              className="btn btn-primary"
            >
              Sign In
            </Link>
          </div>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-3">
          <p className="mb-0">
            Don't have an account?{" "}
            <Link
              to="/Kambaz/Account/Signup"
              id="wd-signup-link"
              className="text-decoration-none"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
