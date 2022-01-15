import Link from "next/link"
import {VscSearch} from 'react-icons/vsc'
import {AiOutlineLogout,AiOutlineLogin} from 'react-icons/ai';
import Nabvar from "../Nabvar"
import Modal from "../../Modal";
import UseModal from "../../../Hooks/UseModal";
import Auth from "../../Auth";
import useAuth from "../../../Hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { getMeApi } from "../../../api/user";

const Header = () => {
    const {modalIsOpen,openModal,afterOpenModal,closeModal, setIsOpen} = UseModal();
    const {auth, logOut} = useContext(AuthContext);

   
    return (
        <div style={{width:"100vw"}}>
        
        <header className="layout_container_header flex  items-center justify-between" >
                        <Logo/>
                        <Search/>
                        <div className="flex items-center">
                            {
                                (auth?.idUser) ? ( <AiOutlineLogout size="2em" onClick={()=> logOut()}/>) : (<AiOutlineLogin size="2em"  onClick={() => openModal()}/>)
                            }
                        </div>
        </header>
        <Nabvar/>
        <Modal  
            modalIsOpen={modalIsOpen}
            openModal={openModal}
            afterOpenModal={afterOpenModal}
            closeModal={closeModal}
            
            >
                <Auth setModal={setIsOpen}/>
            </Modal>
        </div>
    )
}

export default Header



const  Logo = () =>  (
        <div className="flex flex-col items-center layout_container_logo">
            <Link href="/"><a><img src='/logo.png' className="layout_container_logo_image"/></a></Link>
            <Link href="/"><a><h1 className="ml-1 layout_container_logo_h1">GameStore</h1></a></Link>
        </div>
);

const Search = () => (
        <div className="flex items-center layout_container_search">
            <VscSearch  className="layout_container_icon"/>
            <input type="serch" placeholder="Busquemos un juego" className="layout_container_input bg-gray-800  focus:outline-none py-1 px-4 text-center "/>
        </div>
);

const Menu = () => (
    <div className="layout_container_nabvar">
                <nav className="w-full">
                    <ul className="flex  justify-around">
                        <li className="layout_container_nabvar_listitem">
                           hola
                        </li>
                        <li className="layout_container_nabvar_listitem">
                        hola
                        </li>
                    </ul>
                </nav>
        </div>
)

