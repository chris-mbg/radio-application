import { useEffect } from 'react';
import { useContext } from "react";
import UserFavourites from '../components/UserFavourites';
import UserInfo from '../components/UserInfo';
import { UserContext } from "../contexts/UserContext";
import styles from '../css/UserPage.module.css'

const UserPage = () => {

  useEffect(() => window.scrollTo(0, 0), []);

  const { userLoggedIn, logoutUser } = useContext(UserContext);

  const handleLogout = () => {
    logoutUser();
  }

  return (
    <div>
      {userLoggedIn ?
        <div className={styles.logoutButtonWrapper}>
          <button onClick={handleLogout}>Logga ut</button>
        </div> : null }
      {userLoggedIn ? <h1>Välkommen, {userLoggedIn.userFirstName}!</h1> : <p>Loading...</p>}
      {userLoggedIn ?
        <div className={styles.compContainer}>
          <UserInfo />
          <UserFavourites />
        </div> : null }
    </div>
  );
}

export default UserPage;