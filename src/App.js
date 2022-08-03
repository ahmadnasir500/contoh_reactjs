import React, {useEffect} from "react";

import { useLocation, Outlet} from "react-router-dom";
import Header from "./components/templates/Header";
import Footer from "./components/templates/Footer";
import ButtonToTop from "./components/ButtonToTop";
import ThemeProvider from "react-bootstrap/ThemeProvider";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  }, [location]);
  useEffect(() => {
    const handleScroll = (event) => {
      window.scrollY > 50 ? document.getElementById("nav-header").classList.add("bg-quran") : document.getElementById("nav-header").classList.remove("bg-quran")
      window.scrollY > 800 ? document.getElementById("btn-to-top").style.display ="block" : document.getElementById("btn-to-top").style.display ="none"
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
        <ButtonToTop/>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
