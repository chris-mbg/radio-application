import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/UserInfo.module.css";

const UserInfo = () => {
  const { userLoggedIn, editUser, deleteUser } = useContext(UserContext);
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
        <div>
          <h2>Användaruppgifter</h2>
          <p>
            Namn: {userLoggedIn.userFirstName} {userLoggedIn.userLastName}
          </p>
          <p>E-mail: {userLoggedIn.userEmail}<button className={styles.editButton} onClick={() => toggleEditMode()}><i className="fas fa-edit"></i></button></p>
        </div>
      ) : null}
      {editModeOn ? (
        <fieldset className={styles.formWrapper}>
          <legend>Skriv in din nya email!</legend>
          <form onSubmit={handleEditSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
            />
            <button className={styles.editButton} type="submit">Bekräfta ändring</button>
          </form>
        </fieldset>
      ) : null}
      {userLoggedIn ? (
        <div className={styles.deleteButtonWrapper}>
          <button onClick={handleDeleteClick}>Ta bort konto <i className="fas fa-skull-crossbones"></i></button>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfo;
