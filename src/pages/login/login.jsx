import React, { useEffect } from "react";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './login.css';
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth); 

   
  useEffect(() => {
    // Check if user is authenticated
    if (user) {
      // Redirect user to entry page
      navigate("/entry");
    }
  }, [user]);

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    
    console.log(result);
    navigate("/entry");
  };
  return (
    <div className="login">
      <button onClick={signInWithGoogle} className="signIn">Sign In With Google</button>
    </div>
  );
};
