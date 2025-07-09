import { Navigate, Route, Routes } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";

export default function Courses() {
  return (
    <div id="wd-courses">
      <hr />
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
              <Route path="People" element={<h2>People</h2>} />
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
