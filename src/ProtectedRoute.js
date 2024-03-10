// ProtectedRoute.js
import React, { useState, useContext } from "react";
// import { Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { Outlet } from "react-router-dom";
import { Login } from "./pages/login/login";




const ProtectedRoute = () => {
//   const [user, setUser] = useState(null); // Initialize user state with null

    const [user] = useAuthState(auth); // Initialize user state with null
  // Subscribe to authentication state changes
//   useAuthState(auth, (user) => {
//     setUser(user); // Update user state when authentication state changes
//   });

  return user ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
