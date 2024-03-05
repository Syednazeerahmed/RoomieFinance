import React from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import "../styles/navbar.css";
import { signOut } from "firebase/auth";


export const Navbar = () => {

  const [ user ] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <nav>
      <div className="links">
        <Link to="/">Entry</Link>
        <Link to="login">All-Entries</Link>
        <Link to="contact">My-Entries</Link>
        {user && <button onClick={signUserOut}>Log out</button>}
      </div>
      
    </nav>
  );
}

// {
//   user && (
//     <div className="user">
//       {/* <p>{user?.displayName}</p> */}
//       {/* <img
//             src={user?.photoURL || ""}
//             referrerPolicy="no-referrer"
//             width="100"
//             height="100"
//           /> */}
//       <button onClick={signUserOut}>Log out</button>
//     </div>
//   );
// }