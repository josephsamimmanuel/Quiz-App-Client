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
import { ROUTES } from "./utils/constants";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function App() {
  return (
    <div>
      <Toaster />
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <Routes>
              {/* Common Routes */}
              <Route path={ROUTES.COMMON.LOGIN} element={<Login />} />
              <Route path={ROUTES.COMMON.REGISTER} element={<Register />} />
              {/* Protected Routes */}
              {/* User Routes */}
              <Route path="/" element={<ProtectedRoute />}>
                <Route path={ROUTES.PROTECTED.USER.HOME} element={<Home />} />
                <Route path={ROUTES.PROTECTED.USER.WRITE_EXAM} element={<WriteExam />} />
                <Route path={ROUTES.PROTECTED.USER.REPORTS} element={<UserReports />} />
                <Route path={ROUTES.PROTECTED.USER.PROFILE} element={<Profile />} />
              </Route>
              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route path={ROUTES.PROTECTED.ADMIN.EXAMS} element={<Exams />} />
                <Route path={ROUTES.PROTECTED.ADMIN.ADD_EXAM} element={<AddEditExam />} />
                <Route path={ROUTES.PROTECTED.ADMIN.EDIT_EXAM} element={<AddEditExam />} />
                <Route path={ROUTES.PROTECTED.ADMIN.REPORTS} element={<AdminReports />} />
                <Route path={ROUTES.PROTECTED.ADMIN.PROFILE} element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </I18nextProvider>
      </Provider>
    </div>
  )
}

export default App
