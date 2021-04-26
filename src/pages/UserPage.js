import { useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const UserPage = () => {



  useEffect(() => window.scrollTo(0, 0), []);

  // const handleLogout = e => {
  //   e.stopPropagation();
  //   logoutUser();
  // }

  const { userLoggedIn, logoutUser } = useContext(UserContext);

  const handleLogout = e => {
    e.stopPropagation();
    logoutUser();
  }

  return (
    <div>
      <h1>This is the user page 😇 </h1>
      {userLoggedIn ? <button onClick={handleLogout}>Logga ut</button> : null }
    </div>
  );
}

export default UserPage;