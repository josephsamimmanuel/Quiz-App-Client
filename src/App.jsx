import "./App.css";
import { Button } from "antd";
import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textElements.css";
import "./stylesheets/customComponents.css";
import "./stylesheets/formElements.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
