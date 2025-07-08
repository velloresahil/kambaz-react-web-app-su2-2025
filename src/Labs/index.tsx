import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import TOC from "./TOC";
import { Route, Routes } from "react-router-dom";

export function Labs() {
  return (
    <div>
      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="Lab1/*" element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
      </Routes>

      
    </div>
  );
}