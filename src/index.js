import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import HomePage from "./pages/guest/Home";
import AboutPage from "./pages/guest/About";
import DetailUser from "./pages/user/DetailUser";
import DetailSurahPage from "./pages/user/DetailSurah";
import CareerPage from "./pages/user/Career";
import Blog from "./pages/user/Blog";
import AddEditBlog from "./pages/user/AddEditBlog";
import DetailBlog from "./pages/user/DetailBlog";
// import ProtectedComponent from "./components/ProtectedComponent";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route
              path="/surah/:id"
              element={
//                 <ProtectedComponent>
                  <DetailSurahPage />
//                 </ProtectedComponent>
              }
            />
            <Route
              path="/career"
              element={
//                 <ProtectedComponent>
                  <CareerPage />
//                 </ProtectedComponent>
              }
            />
            
            <Route path="/user" element={<DetailUser />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/create" element={<AddEditBlog />} />
            <Route path="/update/:id" element={<AddEditBlog />} />
            <Route path="/detail/:id" element={<DetailBlog />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
