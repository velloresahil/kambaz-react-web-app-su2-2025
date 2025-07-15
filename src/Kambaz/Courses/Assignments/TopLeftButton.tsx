import { FaPlus } from "react-icons/fa6";

export function TopLeftButton() {
    return (
      <div className="d-flex">
        <button
          id="wd-group-assignment-btn"
          className="btn btn-sm btn-secondary d-flex align-items-center justify-content-center me-2"
          style={{ height: "36px", padding: "0 16px", fontSize: "14px" }}
        >
          <FaPlus className="me-2" />
          Group
        </button>
        <button
          id="wd-add-assignment-btn"
          className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
          style={{ height: "36px", padding: "0 16px", fontSize: "14px" }}
        >
          <FaPlus className="me-2" />
          Assignment
        </button>
      </div>
    );
  }