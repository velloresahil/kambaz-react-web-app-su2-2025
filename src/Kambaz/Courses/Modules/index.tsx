import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";
import { BsGripVertical } from "react-icons/bs";
 


export default function Modules() {
    const { cid } = useParams();
   const modules = db.modules;
  return (
    <div>
      
        <ModulesControls />
        <br /><br /><br /><br />
      
      
 
  
  <ListGroup className="rounded-0" id="wd-modules">
{modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {module.name} <ModuleControlButtons />
            </div>
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                  </ListGroup.Item>
                ))}</ListGroup>)}</ListGroup.Item>))}

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
     
</div>



    
  );
}
