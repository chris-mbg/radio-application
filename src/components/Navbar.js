import styles from "../css/Navbar.module.css";
import { NavLink } from "react-router-dom";
import useModal from "../hooks/useModal";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import RegisterLogInModal from "./RegisterLogInModal";

const Navbar = () => {
  const { userLoggedIn } = useContext(UserContext);
  const { isVisible, toggleModal } = useModal();

  const handleModalClick = () => {
    toggleModal();
  };

  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/"
        className={`${styles.navlink} ${styles.navLogoWrapper} ${styles.navLogoSmall}`}
      >
        <p className={styles.navLogo}>P.Ett</p>
        <img
          className={styles.radioIcon}
          src="./assets/icons/radio-icon-2.svg"
          alt="radio icon"
        />
      </NavLink>
      <NavLink
        to="/"
        className={`${styles.navlink} ${styles.navLogoWrapper} ${styles.navLogoLarge}`}
      >
        <p className={styles.navLogo}>ProgramEtt</p>
        <img
          className={styles.radioIcon}
          src="./assets/icons/radio-icon-2.svg"
          alt="radio icon"
        />
      </NavLink>
      <div className={styles.linkWrapper}>
        {userLoggedIn ? (
          <NavLink to="/user">
            <i className="fas fa-user fa-lg"></i>
          </NavLink>
        ) : (
          <div>
            <p onClick={() => handleModalClick()}>Logga in/Registrera</p>
          </div>
        )}
        <RegisterLogInModal isVisible={isVisible} hideModal={toggleModal} />
      </div>
    </nav>
  );
};

export default Navbar;
