import { Button } from "react-bootstrap";
import {
  FaCheckCircle,
  FaBan,
  FaChartBar,
  FaBell,
  FaBullhorn,
  FaCloudUploadAlt,
  FaDownload,
  FaHome,
  FaListUl,
  FaUserClock
} from "react-icons/fa";

export default function CourseStatus() {
  return (
    <div className="p-3">
      <div id="wd-course-status">
        <h2>Course Status</h2>
        <div className="d-flex gap-2 mb-2">
          <Button variant="secondary">
            <FaBan className="me-1" />
            Unpublish
          </Button>

          <Button variant="success">
            <FaCheckCircle className="me-1" />
            Publish
          </Button>
        </div>

        <div className="d-grid gap-2">
          <Button variant="secondary" size="sm">
            <FaUserClock className="me-1" />
            View Course Progress
          </Button>
          <Button variant="secondary" size="sm">
            <FaDownload className="me-1" />
            Import Existing Content
          </Button>
          <Button variant="secondary" size="sm">
            <FaCloudUploadAlt className="me-1" />
            Import From Commons
          </Button>
          <Button variant="secondary" size="sm">
            <FaHome className="me-1" />
            Choose Home Page
          </Button>
          <Button variant="secondary" size="sm">
            <FaListUl className="me-1" />
            View Course Stream
          </Button>
          <Button variant="secondary" size="sm">
            <FaBullhorn className="me-1" />
            View Announcement
          </Button>
          <Button variant="secondary" size="sm">
            <FaChartBar className="me-1" />
            View Analytics
          </Button>
          <Button variant="secondary" size="sm">
            <FaBell className="me-1" />
            View Course Notifications
          </Button>
        </div>
      </div>
    </div>
  );
}
