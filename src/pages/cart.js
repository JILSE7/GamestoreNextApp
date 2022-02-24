import React, { useEffect, useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import { getGameUrl } from '../api/game'
import BasicLayout from '../Components/Layouts/BasicLayout'
import GameComponent from '../Components/Games/'
import Loader from 'react-loader-spinner'

const cart = () => {

    

    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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


    console.log(cartItems);

    
    


  return (
    <div className='container'>
        <BasicLayout>
            <h1>Mi carrito</h1>

            <div className='container_game_search'>
                {
                   isLoading?  <Loader type="Puff" color="#00BFFF" height={200} width={200} className="mb-24"/> :  cartItems.map(game => <GameComponent game={game}/>)
                }
                       
            </div>
        </BasicLayout>
    </div>
  )
}

export default cart