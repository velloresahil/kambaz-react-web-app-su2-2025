import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
export default function TOC() {
 return (
   <Nav variant="pills">
     <Nav.Item>
       
       <Nav.Link to="/Labs/Lab1" as={Link}>Lab 1</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link to="/Labs/Lab2" as={Link}>Lab 2</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link to="/Kambaz" as={Link}>Kambaz</Nav.Link>
     </Nav.Item>
     <Nav.Item>
       <Nav.Link href="https://github.com/velloresahil">My GitHub</Nav.Link>
     </Nav.Item>
   </Nav>
);}
