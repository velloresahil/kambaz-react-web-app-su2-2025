import { BsGripVertical } from "react-icons/bs";
import { FaSearch, FaRegFileAlt } from "react-icons/fa";
import { TopLeftButton } from "./TopLeftButton";
import CheckTickGreen from "./CheckTickGreen";
import AssignmentPercentageButton from "./AssignmentPercentageButton";
import { Link , useParams} from "react-router-dom";
import * as db from "../../Database";

export default function Assignments() {
  const {cid} = useParams();
  const assignments = db.assignments.filter((assignment:any)=> assignment.course === cid);
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
            {assignments.length > 0 ? (
              assignments.map((assignment: any) => (
                <li
                  key={assignment._id}
                  className="wd-lesson list-group-item p-3 ps-1 d-flex align-items-start justify-content-between"
                  style={{ borderLeft: "3px solid green" }} 
                >
                  <div className="d-flex align-items-start">
                    <BsGripVertical className="me-2 fs-3" />
                    <div>
                      <Link
                        to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                        className="text-dark text-decoration-none"
                      >
                        <div className="d-flex align-items-center">
                          <FaRegFileAlt className="me-2 text-success fs-5" />
                          <strong>{assignment.title}</strong>
                        </div>
                      </Link>
                      <p className="text-muted mb-0 ms-4 fs-6">
                      <span className="text-danger">Multiple Modules</span> | 
                        Due: {assignment.due ? assignment.due : "TBD"}  |  
                        Points: {assignment.points ? assignment.points : "N/A"}  |  
                        Available: {assignment.availableFrom ? assignment.availableFrom : "N/A"} - {assignment.availableUntil ? assignment.availableUntil : "N/A"}
                      </p>
                    </div>
                  </div>
                  <CheckTickGreen />
                </li>
              ))
            ) : (
              <p className="text-center text-muted p-3">No assignments available for this course.</p>
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
}