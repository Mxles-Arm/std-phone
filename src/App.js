import Home from "./components/home";
import Edit from "./components/Edit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";   // เพิ่มบรรทัดนี้

const App = () => {
  return (
    <BrowserRouter>

      <div className="container text-center mt-4">

        <h1 className="oasis-title">
          Student Phone
        </h1>

        <div className="oasis-card">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/std-phone" element={<Home />} />
            <Route path="/edit" element={<Edit />} />
          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
};

export default App;

