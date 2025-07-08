export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />

      <textarea id="wd-description" rows={10} cols={50}>
        Sample assignment description goes here.
      </textarea>
      <br />

      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
              <option value="Complete/Incomplete">Complete/Incomplete</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="Online">Online</option>
              <option value="On Paper">On Paper</option>
              <option value="No Submission">No Submission</option>
            </select>
            <br />
            <label>Online Entry Options</label><br />
            <input type="checkbox" id="wd-text-entry" /> Text Entry <br />
            <input type="checkbox" id="wd-website-url" /> Website URL <br />
            <input type="checkbox" id="wd-media-recordings" /> Media Recordings <br />
            <input type="checkbox" id="wd-student-annotation" /> Student Annotation <br />
            <input type="checkbox" id="wd-file-upload" /> File Uploads <br />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label htmlFor="wd-assign-to">Assign to</label>
          </td>
          <td>
            <input id="wd-assign-to" defaultValue="Everyone" />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
          </td>
        </tr>
        <tr>
          <td align="right">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td>
            <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
            <label htmlFor="wd-available-until"> Until </label>
            <input id="wd-available-until" type="date" defaultValue="2024-05-20" />
          </td>
        </tr>
      </table>

      <br />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
