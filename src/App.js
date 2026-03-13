import Home from "./components/home";
import Edit from "./components/Edit";
import { HashRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./components/app.css";

const App = () => {
  return (
    <HashRouter>
      <div className="container text-center mt-4">
        <h1 className="oasis-title">Student Phone</h1>

        <div className="oasis-card">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit" element={<Edit />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;