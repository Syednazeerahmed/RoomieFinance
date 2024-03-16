import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { Outlet } from "react-router-dom";
import { Login } from "./pages/login/login";

const ProtectedRoute = () => {
 
  const [user] = useAuthState(auth); // Initialize user state with null
  
  return user ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
