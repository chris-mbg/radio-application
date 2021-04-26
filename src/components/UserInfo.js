import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from '../css/UserInfo.module.css';

const UserInfo = () => {

  const { userLoggedIn, editUser, deleteUser } = useContext(UserContext);
  const handleDeleteClick = () => {
    console.log('Vill bli raderad. userId:', userLoggedIn.userId);
    //deleteUser(userLoggedIn.userId);
  }

  const handleEditClick = () => {
    console.log('Vill bli editerad. userId:', userLoggedIn.userId);
    //editUser(userLoggedIn.userId);
  }


  return (
    <div>
      {userLoggedIn ?
        (<div>
          <h2>Användaruppgifter</h2>
          <p>{userLoggedIn.userFirstName}</p>
          <p>{userLoggedIn.userLastName}</p>
          <p>{userLoggedIn.userEmail}</p>
        </div>)
      : null }
      { userLoggedIn ? <button onClick={handleEditClick}>Ändra uppgifter</button> : null }
      { userLoggedIn ? <button onClick={handleDeleteClick}>Ta bort konto</button> : null }
    </div>
  );
}

export default UserInfo;