import React from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import UseModal from '../../Hooks/UseModal'
import Modal from '../Modal'

const Address = () => {
    const {modalIsOpen,setIsOpen,openModal,closeModal} = UseModal();
    return (
        <div className="container_address">
            <p className="container_account_title">Direcciones</p>
            <p>Agregar</p>
            <BsFillPlusCircleFill className="container_address_iconPlus" onClick={()=> openModal()}/>
            <div className="container_address_data">
                <p>lIsta de direcciona</p>
            </div>
            <Modal    
                 modalIsOpen={modalIsOpen}
                openModal={openModal}
                closeModal={closeModal}
            >
                holaaaaaaaaaaaa
            </Modal>
        </div>
    )
}

export default Address
