import { useContext, useState } from "react";
import { createPortal } from "react-dom";

const RegisterLogInModal = ({ isVisible, hideModal }) => {

  const placement = document.querySelector(".App");

  return isVisible ? createPortal(<div>{/* Register and login components here! */}</div>, placement) : null
};

export default RegisterLogInModal;
