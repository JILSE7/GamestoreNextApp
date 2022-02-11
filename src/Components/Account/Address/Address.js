import React from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import UseModal from '../../../Hooks/UseModal'
import AddressForm from '../AddressForm'
import Modal from '../../Modal'
import ListAddress from '../AccountPasswordForm/ListAddress'

const Address = ({user,logOut, reload, setReload}) => {
    const {modalIsOpen,openModal,closeModal, setIsOpen} = UseModal();
    console.log(reload, setReload);
    return (
        <div className="container_address">
            <p className="container_account_title">Direcciones</p>
            <p>Agregar</p>
            <BsFillPlusCircleFill className="container_address_iconPlus" onClick={()=> openModal()}/>
            <div className="container_address_data">
                <ListAddress user={user} logOut={logOut} reload={reload} setReload={setReload}/>
            </div>
            <Modal    
                 modalIsOpen={modalIsOpen}
                openModal={openModal}
                closeModal={closeModal}
            >
                <AddressForm user={user} logOut={logOut} setModal={setIsOpen}  setReload={setReload}/>
            </Modal>
        </div>
    )
}

export default Address
