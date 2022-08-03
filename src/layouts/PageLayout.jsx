import React from "react";
import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import ThemeProvider from "react-bootstrap/ThemeProvider";

const PageLayout = (props) => {
  const { children } = props;
  return (
    <>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <Header />
        {children}
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default PageLayout;