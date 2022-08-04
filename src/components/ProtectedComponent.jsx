import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/auth";
import LoadingSpinner from "./Spinner";
const ProtectedComponent = ({ children }) => {
  const navigate = useNavigate();
  const [user, isLoading] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) {
    return (<LoadingSpinner />);
  } else {
    return children;
  }
};

export default ProtectedComponent;
