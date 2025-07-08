import Kambaz from './Kambaz';
import { Labs } from './Labs/index.tsx';
import { HashRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
  <HashRouter>
    <div>
      { <h1>Vellore Anand Kumar Sahil // Section</h1> }
      <Link to="/Labs">
          <button>Go to Labs</button>
        </Link>
        <br />
        <Link to="/Kambaz">
          <button>Go to Kambaz</button>
        </Link>
      <Routes>
      <Route path="Labs/*" element={<Labs />} />
      <Route path="Kambaz/*" element={<Kambaz />} />
      </Routes>
    </div>
  </HashRouter>
  )
}
export default App;