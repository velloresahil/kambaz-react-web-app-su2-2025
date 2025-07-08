export default function Modules() {
  return (
    <div>
      <div>
        <button>Collapse All</button>
        <button>View Progress</button>
        <select defaultValue="publish">
          <option disabled value="publish">Publish All</option>
          <option value="publish_all">Publish All</option>
          <option value="unpublish_all">Unpublish All</option>
        </select>
        <button>+ Module</button>
      </div>

      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">Lecture 1 - Course Introduction, Syllabus, Agenda</span>
              <ul className="wd-content">
                <li><strong>LEARNING OBJECTIVES</strong>
                  <ul>
                    <li>Introduction to the course</li>
                    <li>Learn what is Web Development</li>
                  </ul>
                </li>
                <li><strong>READING</strong>
                  <ul>
                    <li>Full Stack Developer - Chapter 1 - Introduction</li>
                    <li>Full Stack Developer - Chapter 2 - Creating Us</li>
                  </ul>
                </li>
                <li><strong>SLIDES</strong>
                  <ul>
                    <li>Introduction to Web Development</li>
                    <li>Creating an HTTP server with Node.js</li>
                    <li>Creating a React Application</li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="wd-lesson">
              <span className="wd-title">Lecture 2 - Formatting User Interfaces with HTML</span>
              <ul className="wd-content">
                <li><strong>LEARNING OBJECTIVES</strong>
                  <ul>
                    <li>Learn how to create user interfaces with HTML</li>
                    <li>Deploy the assignment to Netlify</li>
                  </ul>
                </li>
                <li><strong>SLIDES</strong>
                  <ul>
                    <li>Introduction to HTML and the DOM</li>
                    <li>Formatting Web content with Headings</li>
                    <li>Formatting content with Lists and Tables</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">Lecture 3 - Styling User Interfaces with CSS</span>
              <ul className="wd-content">
                <li><strong>LEARNING OBJECTIVES</strong>
                  <ul>
                    <li>Understand the basics of CSS</li>
                    <li>Apply styles to HTML elements</li>
                    <li>Use classes and IDs for styling</li>
                  </ul>
                </li>
                <li><strong>SLIDES</strong>
                  <ul>
                    <li>Introduction to CSS</li>
                    <li>Selectors, Properties, and Values</li>
                    <li>CSS Box Model</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 3</div>
        </li>
      </ul>
    </div>
  );
}
