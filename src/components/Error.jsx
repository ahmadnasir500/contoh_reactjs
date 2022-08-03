import React from "react";
import { Button } from "react-bootstrap";
const ErrorDisplay = () => {
  const reload = () => {
    location.reload();
  };
  return (
    <div className="vh-100">
    <p>Hiks! Looks like you found a problem.</p>   
      <Button onClick={reload} className="btn-quran w-50">
        Reload Page
      </Button>
    </div>
  );
};
export default ErrorDisplay;
