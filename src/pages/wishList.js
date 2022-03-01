import React, { useEffect, useState } from 'react'
import { getFavorites } from '../api/favorites';
import BasicLayout from '../Components/Layouts/BasicLayout'
import useAuth from '../Hooks/useAuth';
import GameComponent from '../Components/Games';

const WishList = () => {

    const {auth, logOut} = useAuth();

    const [wishListItems, setwishListItems] = useState([]);


    useEffect(() => {
        if(auth){
            getFavorites(auth.idUser, logOut).then((data) => setwishListItems([...data]))
                                             .catch(console.log());
        }
    }, [auth])
    


  return (
    <div className="container ">
    <BasicLayout >
    <h2 className='text-center'>Lista de deseos</h2>
    <div className='flex flex-wrap w-full item-center justify-center'>
       {
           wishListItems.map(item => <GameComponent game={item.game}/>)
       }

    </div>

    
    </BasicLayout>
</div>
  )
}

export default WishList