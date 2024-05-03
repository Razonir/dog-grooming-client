import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { GetUser } from "../Services/UserService.ts";
import { jwtDecode } from "jwt-decode";

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken?.role === "User" || decodedToken?.role === "Admin" ) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
