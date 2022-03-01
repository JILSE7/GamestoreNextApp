import React, { useEffect, useState } from 'react'
import { FaBabyCarriage } from 'react-icons/fa';
import { getDisscount, getTotal } from '../utils/functions';
import { getGameUrl } from '../api/game'
import {ImCross} from 'react-icons/im';
import BasicLayout from '../Components/Layouts/BasicLayout'
import GameComponent from '../Components/Games/'
import ListAddress from '../Components/Account/AccountPasswordForm/ListAddress';
import Loader from 'react-loader-spinner';
import Payment from '../Components/Payment/Payment';
import useAuth from '../Hooks/useAuth';




const Cart = () => {

    const {logOut, auth,setReloadUser,reloadUser} =  useAuth();
    
    const [address, setaddress] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(0);
    

    const handleGame = (game) => {
        const newCart =  cartItems.filter(gameItem => gameItem.id !== game.id);
        localStorage.setItem('cart', JSON.stringify(newCart.map(game => game.url)));
        setCartItems(newCart);
    }

    const handleClick = (add) => {
        console.log(add);
        setaddress({...add})
    }

    const getGame = async(url) => await getGameUrl(url);
        
    useEffect(async() => {
    const games = JSON.parse(localStorage.getItem('cart')) || [];
        if(games.length > 0 ){
            setIsLoading(true);
            const a = [];
            for(let game of games){
                const newGame = await getGame(game);
                a.push(newGame)
            }
            setCartItems([...a]);
            setIsLoading(false);
        }
        
    }, []);
    
    
    useEffect(() => setTotal(getTotal(cartItems)), [cartItems]);
  


  return (
    <div className='container'>
        <BasicLayout>
            
                
            <div className='flex w-100 justify-between mt-5'>
                <FaBabyCarriage size={"1.5em"}/>
            
                <div className='flex items-center'>
                    <h2>Total a pagar: </h2>
                    {
                        isLoading? <Loader type="Oval" color="#00BFFF" height={20} width={20} className=" ml-2 mt-1"/> : <p className='text-xl text-green-400'>  ${total}</p>
                    }
                </div>
            </div>

            <div className='container_game_search'>

                {
                   isLoading?  <Loader type="Puff" color="#00BFFF" height={200} width={200} className="mb-24"/> :  cartItems.map(game => <div className=' z-50 flex flex-col items-center'>
                    <ImCross className='mb-1' onClick={() => handleGame(game)}/>
                    <GameComponent game={game}/>
                    <p>Total ${getDisscount(game)}</p>
                    <p>Entrega Inmediata</p>
                   </div>)
                }
            </div>

            <h2>Direcciones</h2>
            <div className="container_address_data flex">
                {   
                    auth && <ListAddress logOut={logOut} user={{_id:auth.idUser }} reload={reloadUser} setReload={setReloadUser} click={handleClick} addselect={address}/>
                }
            </div>
            <div className='flex w-full justify-center'>

                <Payment products={cartItems} address={address} setpaymentState={setReloadUser}/>
            </div>
            
            
        </BasicLayout>
    </div>
  )
}

export default cart