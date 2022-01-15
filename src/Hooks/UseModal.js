import { useState } from "react";


const UseModal = () => {
const [modalIsOpen, setIsOpen] = useState(false);
const openModal = () => setIsOpen(true);
const closeModal = () => setIsOpen(false);

  return {
      modalIsOpen,
      setIsOpen,
      openModal,
      closeModal
  }
  
}

export default UseModal;