import { IoEllipsisVertical } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";


export default function AssignmentPercentageButton() {
  const navigate = useNavigate();
  const { cid } = useParams();
  return (
    <div className="d-flex align-items-center">
      <button
        id="wd-assignment-percentage"
        className="btn btn-sm btn-outline-secondary me-2 rounded-pill"
        type="button"
        style={{ height: "36px", fontSize: "14px" , padding: "0 12px", borderRadius: "50px", color:"black" }}
      >
        40% of Total
      </button>
      <IoIosAdd
        className="fs-4 me-2 text-success"
        role="button"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}