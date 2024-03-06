import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import "../styles/navbar.css";
import { signOut } from "firebase/auth";


export const Navbar = () => {

  const [ user ] = useAuthState(auth);
  // useEffect(() => {
  //       console.log(user?.displayName); 
  //       console.log(user); 
  // }, [])
  
  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <nav>
      <div className="links">
        <Link to="/">home</Link>
        { !user && <Link to="login">login</Link>}
        {/* <Link to="entry">Entry</Link> */}
        {user && (
          <>
            <Link to="entry">Entry</Link>
            <Link to="allEntries">All-Entries</Link>
            {/* <button onClick={signUserOut}>Log out</button> */}
          </>
        )}
      </div>
      <div className="user">
        {user && (
          <>
            {/* <Link to="/">Entry</Link>
            <Link to="login">All-Entries</Link>
            <Link to="contact">My-Entries</Link> */}
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