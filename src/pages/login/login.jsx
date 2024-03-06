import React from "react";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './login.css';
export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/entry");
  };
  return (
    <div className="login">
      <button onClick={signInWithGoogle} className="signIn">Sign In With Google To Continue</button>
    </div>
  );
};
