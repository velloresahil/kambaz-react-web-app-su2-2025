import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaRegFileAlt } from "react-icons/fa";
import { TopLeftButton } from "./TopLeftButton";
import CheckTickGreen from "./CheckTickGreen";
import AssignmentPercentageButton from "./AssignmentPercentageButton";
import { Link } from "react-router-dom";


export default function Assignments() {
  return (
    <div className="container mt-4">
      
      <div className="d-flex align-items-center mb-3">
        
        <div className="input-group me-auto" style={{ maxWidth: "300px" }}>
          <span className="input-group-text bg-white border-end-0">
            <FaSearch className="text-muted" />
          </span>
          <input
            type="text"
            id="wd-search-assignment"
            className="form-control border-start-0"
            placeholder="Search..."
          />
        </div>

       
        <TopLeftButton />
      </div>

      
      <ul id="wd-assignments" className="list-group rounded-0">
        
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </div>
            <AssignmentPercentageButton />
          </div>

          
          <ul className="wd-lessons list-group rounded-0">
            
            <li
              className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-start justify-content-between"
              style={{ borderLeft: "3px solid green" }} 
            >
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <div>
                <Link to="/Kambaz/Courses/1234/Assignments/Editor" className="text-dark text-decoration-none">
                  <div className="d-flex align-items-center">
                  <FaRegFileAlt className="me-2 text-success fs-5" />
                    <strong>A1</strong>
                  </div>
                  </Link>
                  <p className="text-muted mb-0 ms-4 fs-6">
                  <span className="text-danger"> Multiple Modules </span> | Not available until May 6 at 12:00 am |
                    Due May 13 at 11:59 pm | 100 pts
                  </p>
                </div>
              </div>
              <CheckTickGreen />
            </li>

            <li
              className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-start justify-content-between"
              style={{ borderLeft: "3px solid green" }} 
            >
              <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-3" /> 
                <div>
                <Link to="/Kambaz/Courses/1234/Assignments/Editor" className="text-dark text-decoration-none">
                  <div className="d-flex align-items-center">
                  <FaRegFileAlt className="me-2 text-success fs-5" />
                    <strong>A2</strong>
                  </div>
                  </Link>
                  <p className="text-muted mb-0 ms-4 fs-6">
                  <span className="text-danger"> Multiple Modules </span> | Not available until May 13 at 12:00 am |
                    Due May 20 at 11:59 pm | 100 pts
                  </p>
                </div>
              </div>
              <CheckTickGreen />
            </li>

            <li
              className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-start justify-content-between"
              style={{ borderLeft: "3px solid green" }} 
            >
              <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-3" />
                <div>
                <Link to="/Kambaz/Courses/1234/Assignments/Editor" className="text-dark text-decoration-none">
                  <div className="d-flex align-items-center">  
                  <FaRegFileAlt className="me-2 text-success fs-5" />
                    <strong>A3</strong>
                  </div>
                  </Link>
                  
                  <p className="text-muted mb-0 ms-4 fs-6">
                    <span className="text-danger"> Multiple Modules </span>| Not available until May 20 at 12:00 am |
                    Due May 27 at 11:59 pm | 100 pts
                  </p>
                </div>
              </div>
              <CheckTickGreen />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}