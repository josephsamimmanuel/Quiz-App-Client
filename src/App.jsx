import "./App.css";
import { Button } from "antd";
import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textElements.css";
import "./stylesheets/customComponents.css";
import "./stylesheets/formElements.css";
import "./stylesheets/layout.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import ProtectedRoute from "./components/protectedRoute";
import Home from "./pages/common/Home";
import Exams from "./pages/admin/Exams";
import AddEditExam from "./pages/admin/Exams/AddEditExam";
import Profile from "./pages/common/Profile/index";
import WriteExam from "./pages/user/writeExam";
import UserReports from "./pages/user/UserReports";
import AdminReports from "./pages/admin/AdminReports";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/reducer";
function App() {
  return (
    <div>
      <Toaster />
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Common Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected Routes */}
          {/* User Routes */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/user/write-exam/:id" element={<WriteExam />} />
            <Route path="/user/reports" element={<UserReports />} />
          </Route>
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="/admin/exams" element={<Exams />} />
            <Route path="/admin/exams/add" element={<AddEditExam />} />
            <Route path="/admin/exams/edit/:id" element={<AddEditExam />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
