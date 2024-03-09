import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import "../styles/navbar.css";
import { signOut } from "firebase/auth";


export const Navbar = () => {

  const navigate = useNavigate();
  const [ user ] = useAuthState(auth);

  
  const signUserOut = async () => {
    await signOut(auth);
    navigate('/');
  };
  return (
    <nav>
      <div className="links">
        { !user && <Link to="/">login</Link>}
        {/* <Link to="entry">Entry</Link> */}
        {user && (
          <>
            <Link to="entry">Input</Link>
            <Link to="allEntries">Expenses</Link>
            {/* <button onClick={signUserOut}>Log out</button> */}
          </>
        )}
      </div>
      <div className="user">
        {user && (
          <>
            <button onClick={signUserOut}>Log out</button>
          </>
        )}
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