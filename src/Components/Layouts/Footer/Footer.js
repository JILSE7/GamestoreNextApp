import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import AuthContext from '../../../context/AuthContext';
import { getMeApi } from '../../../api/user';

import {BsController,BsHeart} from 'react-icons/bs';
import {FaUserNinja,FaBabyCarriage} from 'react-icons/fa';
import useCart from '../../../Hooks/useCart';
import CartContext from '../../../context/CartContext';
import { countProductsCart } from '../../../api/cart';
import useAuth from '../../../Hooks/useAuth';

const Footer = () => {
    const {auth,logOut, reloadUser} = useContext(AuthContext);

    const {products} = useContext(CartContext)

    const [user, setUser] = useState({});
    
    
        
    useEffect(() => {
         
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
                    
                        <Link href="/orders">
                            <a className="flex flex-col items-center p-1 cursor-pointer">
                            <BsController size={"1.5em"}/>
                            Mis pedidos
                            </a>
                        </Link>
                    
                        <Link href="/wishList">
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
                    <Link href="/cart">
                        <a className="flex flex-col items-center p-1 cursor-pointer">
                            <FaBabyCarriage size={"1.5em"}/>
                            
                            { `Mi carrito ${products}`}
                        </a>
                    </Link>

                    
                    </>
                )
            }
           
            <h5 className="text-center">GAMESTORE &copy;</h5>
        </footer>
    )
}

export default Footer;




