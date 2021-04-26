import { useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const UserPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const { logoutUser } = useContext(UserContext)
  const handleLogout = () => {
    logoutUser();
  }
  return (
    <div>
      <h1>This is the user page 😇 </h1>
      <button onClick={handleLogout}>Logga ut</button>
    </div>
  );
}

export default UserPage;