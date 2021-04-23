import { createPortal } from "react-dom";
import styles from "../css/RegisterLogInModal.module.css";
import RegisterForm from "./RegisterForm";

const RegisterLogInModal = ({ isVisible, hideModal }) => {

  const placement = document.querySelector(".App");

  return isVisible ?
    createPortal(
      <div className={styles.modalContainer}>
        <div className={styles.closeButtonContainer} onClick={hideModal}>
          <button className={styles.closeButton}>X</button>
        </div>
        {/* Login components here! */}
        <RegisterForm />
      </div>,
      placement
    ) : null
};

export default RegisterLogInModal;
