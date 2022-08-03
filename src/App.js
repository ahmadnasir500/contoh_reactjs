import React, { useEffect } from "react";

import { useLocation, Outlet } from "react-router-dom";
import Header from "./components/templates/Header";
import Footer from "./components/templates/Footer";
import ButtonToTop from "./components/ButtonToTop";
import ThemeProvider from "react-bootstrap/ThemeProvider";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);
  useEffect(() => {
    const navHeader = document.getElementById("nav-header");
    const btnToTop = document.getElementById("btn-to-top")
    const handleScroll = (event) => {
      if (typeof navHeader !== null && navHeader !== "undefined") {
        window.scrollY > 50
          ? navHeader.classList.add("bg-quran")
          : navHeader.classList.remove("bg-quran");
      }
      window.scrollY > 800
        ? btnToTop.style.display = "block"
        : btnToTop.style.display = "none"
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <Header />
        <Outlet />
        <ButtonToTop />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
