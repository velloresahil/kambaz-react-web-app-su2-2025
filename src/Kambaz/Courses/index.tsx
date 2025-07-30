import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Table from "./People/Table";
import { FaBars } from "react-icons/fa6";
export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const currentPage = pathname.split("/")[4];

  if (!course) {
    return <h1>Course Not Found</h1>;
  }

  return (
    <div style={{ padding: "10px 20px", backgroundColor: "#fff" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <FaBars style={{ color: "crimson", marginRight: "10px", fontSize: "30px" }} />
        <span style={{ color: "crimson", fontSize: "30px" }}>
          {course.name} &gt; {currentPage}
        </span>
      </div>

      <table>
        <tr>
          <td valign="top">
            <CourseNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="People" element={<Table />} />
              <Route path="Grades" element={<h2>Grades</h2>} />
              <Route path="Quizzes" element={<h2>Quizzes</h2>} />
              <Route path="Zoom" element={<h2>Zoom</h2>} />
              <Route path="Piazza" element={<h2>Piazza</h2>} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}
