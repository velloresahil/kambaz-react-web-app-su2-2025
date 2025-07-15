import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";


export default function Modules() {
  return (
    <div>
      
        <ModulesControls />
        <br /><br /><br /><br />
      
      
 
  
  <ListGroup className="rounded-0" id="wd-modules">
    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> Week 1 <ModuleControlButtons /></div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroup.Item className="wd-lesson p-3 ps-1">
          LEARNING OBJECTIVES <LessonControlButtons /></ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
          Introduction to the course<LessonControlButtons /> </ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
          Learn what is Web Development <LessonControlButtons /></ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
    <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> Week 2 <ModuleControlButtons /></div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroup.Item className="wd-lesson p-3 ps-1">
          LEARNING OBJECTIVES <LessonControlButtons /></ListGroup.Item>
        <ListGroup.Item className="wd-lesson p-3 ps-1">
          Full Stack Developer - Chapter 1 - Introduction <LessonControlButtons /></ListGroup.Item>
      </ListGroup>
      <ListGroup.Item className="wd-lesson p-3 ps-1">
          Full Stack Developer - Chapter 2 - HTML and CSS <LessonControlButtons /></ListGroup.Item>
        </ListGroup.Item>
    
  </ListGroup>
      <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
        <div className="wd-title p-3 ps-2 bg-secondary"> Week 3 <ModuleControlButtons /></div>
        <ListGroup className="wd-lessons rounded-0">
          <ListGroup.Item className="wd-lesson p-3 ps-1">
            LEARNING OBJECTIVES <LessonControlButtons /></ListGroup.Item>
          <ListGroup.Item className="wd-lesson p-3 ps-1">
            Full Stack Developer - Chapter 3 - JavaScript <LessonControlButtons />
      </ListGroup.Item>
          <ListGroup.Item className="wd-lesson p-3 ps-1">
            Full Stack Developer - Chapter 4 - React <LessonControlButtons />
          </ListGroup.Item>
          <ListGroup.Item className="wd-lesson p-3 ps-1">
            Full Stack Developer - Chapter 5 - Node.js <LessonControlButtons />
          </ListGroup.Item>
      </ListGroup>
      </ListGroup.Item>
</div>



    
  );
}
