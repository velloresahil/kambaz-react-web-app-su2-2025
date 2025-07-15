import { Link } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div
      className="wd list-group fs-5 rounded-0">
    
      
      <Link to="/Kambaz/Account/Signin" className="list-group-item border-0 active border border-0">
        <span className="text-black fs-5">Signin</span>
      </Link>

     
      <Link to="/Kambaz/Account/Signup" className="list-group-item border-0 text-decoration-none">
        <span className="text-danger  fs-5">Signup</span>
      </Link>

      
      <Link to="/Kambaz/Account/Profile" className="list-group-item border-0 text-decoration-none">
        <span className="text-danger fs-5">Profile</span>
      </Link>
    </div>
  );
}