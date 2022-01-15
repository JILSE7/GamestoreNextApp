import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import AuthContext from '../../../context/AuthContext';
import { getMeApi } from '../../../api/user';

import {BsController,BsHeart} from 'react-icons/bs';
import {FaUserNinja,FaBabyCarriage} from 'react-icons/fa';

const Footer = () => {
    const {auth,logOut, reloadUser} = useContext(AuthContext);
    const [user, setUser] = useState({});
    console.log(reloadUser);
    
    useEffect(() => {
         console.log("hola desde gutte");
        (async()=>{
            const response = await getMeApi(logOut);
            if(response){
                setUser(response)
            }
        })()
    }, [auth, reloadUser]);


    return (
        <footer className={auth ? "layout_container_header flex  items-center justify-between" : "layout_container_header flex  items-center justify-center"} style={{height:"70px"}} >
            {
                auth  &&(
                    <>
                    
                        <Link href="/mispedidos">
                            <a className="flex flex-col items-center p-1 cursor-pointer">
                            <BsController size={"1.5em"}/>
                            Mis pedidos
                            </a>
                        </Link>
                    
                        <Link href="/wishlist">
                        <a className="flex flex-col items-center p-1cursor-pointer">
                            <BsHeart size={"1.5em"}/>
                            WishLits
                            </a>
                        </Link>
                    
                        <Link href="/account">
                        <a className="flex flex-col items-center p-1 cursor-pointer">
                            <FaUserNinja size={"1.5em"}/>
                            {`${user.name} ${user.lastname}`}
                        </a>
                        </Link>
                    
                    <div className="flex flex-col items-center p-1 cursor-pointer">
                        <FaBabyCarriage size={"1.5em"}/>
                        Mi carrito
                    </div>
                    </>
                )
            }
           
            <h5 className="text-center">GAMESTORE &copy;</h5>
        </footer>
    )
}

export default Footer;



