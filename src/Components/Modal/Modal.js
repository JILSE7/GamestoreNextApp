import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import UseModal from '../../Hooks/UseModal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '355px',
    width: '300px',
    padding: '10px',
    backgroundColor: '#161b22'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('.container');

const ModalForm = ({modalIsOpen,afterOpenModal,closeModal, children}) => {
  

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={200}
        
      >
          {children}
      </Modal>
    </div>
  );
}


export default ModalForm;