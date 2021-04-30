import { useState } from "react";

const useModal = () => {

  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(prevState => !prevState);
  }

  return {
    isVisible,
    toggleModal
  };
}

export default useModal;