import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/UserInfo.module.css";

const UserInfo = () => {
  const { userLoggedIn, editUser, deleteUser, loggedInCheck } = useContext(UserContext);
  const [editModeOn, setEditModeOn] = useState(false);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (userLoggedIn) setEmail(userLoggedIn.userEmail);
  }, [userLoggedIn]);
  //useEffect(()=> loggedInCheck(), []);

  const toggleEditMode = () => setEditModeOn((prevState) => !prevState);

  const handleDeleteClick = () => {
    console.log("Vill bli raderad. userId:", userLoggedIn.userId);
    deleteUser(userLoggedIn.userId);
  };

  const handleEditSubmit = async () => {
    let result = await editUser({ email: email });
    if(result.success) {

    }
  };

  return (
    <div className={styles.userInfoContainer}>
      {userLoggedIn ? (
        <div className={styles.deleteButtonWrapper}>
          <button onClick={handleDeleteClick}>Ta bort konto</button>
        </div>
      ) : null}
      {userLoggedIn ? (
        <div>
          <h2>Användaruppgifter</h2>
          <p>
            Namn: {userLoggedIn.userFirstName} {userLoggedIn.userLastName}
          </p>
          <p>E-mail: {userLoggedIn.userEmail}</p>
        </div>
      ) : null}
      {userLoggedIn ? (
        <button onClick={() => toggleEditMode()}>Ändra e-mail</button>
      ) : null}
      {editModeOn ? (
        <div>
          <form onSubmit={handleEditSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Bekräfta ändring</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfo;
