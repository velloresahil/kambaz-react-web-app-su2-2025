import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signin-screen" className="container mt-4">
      <div className="mx-auto" style={{ maxWidth: "400px" }}>
       
        <h3 className="text-center mb-4">Sign Up</h3>

     
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

          <div className="mb-3">
            <input
              placeholder="Verify Password"
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
              Sign Up
            </Link>
          </div>
        </form>

        
          
        </div>
      </div>
    
    
);}
