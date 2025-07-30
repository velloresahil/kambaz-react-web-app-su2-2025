import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const existingAssignment = assignments.find((a: any) => a._id === aid);
  const [assignment, setAssignment] = useState(
    existingAssignment || {
      title: "",
      description: "",
      points: 100,
      due: "",
      availableFrom: "",
      availableUntil: "",
      course: cid,
    }
  );
  useEffect(() => {
    if (!existingAssignment && aid !== "new") {
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    }
  }, [existingAssignment, aid, cid, navigate]);

  const handleSave = () => {
    if (existingAssignment) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment(assignment));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };
  return (
    <div id="wd-assignments-editor" className="container mt-5">
      
     <p className="mb-4 fs-5">
        <strong>{cid}</strong> &gt; Assignments &gt; {assignment ? assignment.title : "Unknown Assignment"}
      </p>

      
      <form>
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          <strong>Assignment Name</strong>
        </label>
        <input id="wd-name" className="form-control" defaultValue={assignment?.title}
         onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
      </div>

      <div className="row mb-3">
          <textarea
            id="wd-description"
            className="form-control"
            rows={12}
            defaultValue={`The assignment is available online.\nSubmit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n- Your full name and section\n- Links to each of the lab assignments\n- Link to the Kanbas application\n- Links to all relevant source code repositories\n\nThe Kanbas application should include a link to navigate back to the landing page.`}
             onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
          ></textarea>
        </div>

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <label htmlFor="wd-points" className="form-label text-end flex-grow-1">
            Points
          </label>
          <input
            id="wd-points"
            type="number"
            className="form-control w-50 ms-2"
            defaultValue= {assignment?.points || 100}
             onChange={(e) => setAssignment({ ...assignment, points: e.target.value })}
          />
        </div>

      
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <label htmlFor="wd-group" className="form-label text-end flex-grow-1">
            Assignment Group
          </label>
          <select id="wd-group" className="form-control w-50 ms-2">
            <option value="assignments">ASSIGNMENTS</option>
            <option value="others">OTHERS</option>
          </select>
        </div>

      
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <label htmlFor="wd-grade-display" className="form-label text-end flex-grow-1">
          Display Grade as
        </label>
        <select id="wd-grade-display" className="form-control w-50 ms-2">
          <option value="percentage">Percentage</option>
          <option value="rank">Rank</option>
        </select>
      </div>

       
        <div className="row mb-4">
          <div className="col-md-3 p-3 rounded">
                <label htmlFor="wd-submission-type" className="form-label">
                  Submission Type
                </label>
          </div>
          <div className="col-md-9 border p-3 rounded">
            <div className="col-md-8">
                    <select id="wd-submission-type" className="form-control">
                    <option value="online">Online</option>
                    <option value="inperson">In Person</option>
                    </select>
            </div>
            <div className="col-md-8 mb-2 mt-3">
                <label className="form-label"><strong>Online Entry Options</strong></label>
            </div>
            <div className="col-md-8">
            <div className="form-check mb-2">
              <input
                id="wd-text-entry"
                type="checkbox"
                className="form-check-input"
              />
              <label htmlFor="wd-text-entry" className="form-check-label">
                Text Entry
              </label>
            </div>
            <div className="form-check  mb-2">
              <input
                id="wd-website-url"
                type="checkbox"
                className="form-check-input"
                defaultChecked
              />
              <label htmlFor="wd-website-url" className="form-check-label">
                Website URL
              </label>
            </div>
            <div className="form-check  mb-2">
              <input
                id="wd-media-recordings"
                type="checkbox"
                className="form-check-input"
              />
              <label
                htmlFor="wd-media-recordings"
                className="form-check-label"
              >
                Media Recordings
              </label>
            </div>
            <div className="form-check  mb-2">
              <input
                id="wd-student-annotation"
                type="checkbox"
                className="form-check-input"
              />
              <label
                htmlFor="wd-student-annotation"
                className="form-check-label"
              >
                Student Annotation
              </label>
            </div>
            <div className="form-check  mb-2">
              <input
                id="wd-file-upload"
                type="checkbox"
                className="form-check-input"
              />
              <label htmlFor="wd-file-upload" className="form-check-label">
                File Uploads
              </label>
            </div>
          </div>      
        </div>
    </div>

            


        <div className="row mb-4">
            <div className="col-md-3">
                <label>Assign</label>
            </div>
            <div className="col-md-9">
        <div className="row mb-4">
          <div className="col-md-12 border p-3 rounded">
            <label htmlFor="wd-assign-to" className="form-label">
              <strong>Assign to</strong>
            </label>
            <input
              id="wd-assign-to"
              className="form-control mb-3"
              defaultValue="Everyone"
            />

           
            <div className="row mb-3">
                <div className="col-md-12">
                  <label htmlFor="wd-due-date" className="form-label"><strong>Due</strong></label>
                  <input id="wd-due-date" type="date" className="form-control" defaultValue={assignment?.due}
                    onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />
                </div>
              </div>
            
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="wd-available-from" className="form-label"><strong>Available from</strong></label>
                  <input id="wd-available-from" type="date" className="form-control" defaultValue={assignment?.availableFrom}
                  onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="wd-available-until" className="form-label"><strong>Until</strong></label>
                  <input id="wd-available-until" type="date" className="form-control" defaultValue={assignment?.availableUntil}
                  onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

     
        <div className="d-flex justify-content-end">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
          <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}