import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="container mt-4">
     
      <h3 className="text-start mb-4">Profile</h3>

     
      <form style={{ maxWidth: "500px" }}>
       

      
        <div className="mb-3">
          <input
            id="wd-username"
            className="form-control"
            defaultValue="alice"
            placeholder="Username"
            type="text"
          />
        </div>

        
        <div className="mb-3">
          <input
            id="wd-password"
            className="form-control"
            defaultValue="123"
            placeholder="Password"
            type="password"
          />
        </div>

      
        <div className="mb-3">
          <input
            id="wd-firstname"
            className="form-control"
            defaultValue="Alice"
            placeholder="First Name"
            type="text"
          />
        </div>

      
        <div className="mb-3">
          <input
            id="wd-lastname"
            className="form-control"
            defaultValue="Wonderland"
            placeholder="Last Name"
            type="text"
          />
        </div>

       
        <div className="mb-3">
          <input
            id="wd-dob"
            className="form-control"
            defaultValue="2000-01-01"
            placeholder="Date of Birth"
            type="date"
          />
        </div>

        
        <div className="mb-3">
          <input
            id="wd-email"
            className="form-control"
            defaultValue="alice@wonderland"
            placeholder="Email"
            type="email"
          />
        </div>

        <div className="mb-3">
          <select id="wd-role" className="form-control">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>

      
        <div className="d-flex justify-content-between mt-4">
          <Link to="/Kambaz/Account/Signin" className="btn btn-danger">
            Sign Out
          </Link>
        </div>
      </form>
    </div>
  );
}
