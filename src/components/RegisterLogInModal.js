import { createPortal } from "react-dom";
import styles from "../css/RegisterLogInModal.module.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const RegisterLogInModal = ({ isVisible, hideModal }) => {

  const placement = document.querySelector(".App");

  return isVisible ?
    createPortal(
      <div className={styles.modalContainer}>
        <div className={styles.closeButtonContainer} onClick={() => hideModal()}>
          <button className={styles.closeButton}>X</button>
        </div>
        <div className={styles.contentContainer}>
          <h1>Logga in på ditt konto, eller registrera dig som ny användare här.</h1>
          <div className={styles.componentsContainer}>
            <LoginForm hideModal={hideModal} />
            <RegisterForm hideModal={hideModal}/>
          </div>
        </div>
      </div>,
      placement
    ) : null
};

export default RegisterLogInModal;
