import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { addFavorite, deleteFavorite, isFavorite } from '../api/favorites';
import { getGameUrl } from '../api/game';
import BasicLayout    from '../Components/Layouts/BasicLayout';
import Carousel       from '../Components/Carousel';
import GameComponent  from '../Components/Games';
import VideoComponent from '../Components/Video';
import WaitUser       from '../Components/WaitUser/WaitUser';
import useAuth from '../Hooks/useAuth';
import Loader from 'react-loader-spinner';
import useCart from '../Hooks/useCart';
import { addProductC } from '../api/cart';
import AuthContext from '../context/AuthContext';



const Game = () => {

    const {query} = useRouter();
    const {setreloadCart} = useContext(AuthContext)
    const {auth, logOut, addProduct} = useAuth();

    
    

    const [game, setGame] = useState(undefined);
    const [isFavoriteState, setIsFavoriteState] = useState(false);
    const [realodFavorite, setrealodFavorite] = useState(false)


    const toggleFavorite = async(isAdd) => {
        if(auth){
           const response =  (isAdd) ? await addFavorite(auth.idUser, game.id, logOut) : await deleteFavorite(isFavoriteState._id, logOut);
           console.log(response);

           setrealodFavorite(true);
        }

        setrealodFavorite(false);
    };


    useEffect(() => {
        if(query.game){
            getGameUrl(query.game).then((data) => setGame({...data[0]}))
                             .catch(console.log)
        }
    }, [query, realodFavorite]);


    useEffect(() => {

        if(auth && game){
            isFavorite(auth.idUser, game.id, logOut).then((data) => setIsFavoriteState({...data[0]}))
                                                    .catch(console.log())
        }
    }, [game])
    
    


  return (
    <div className='container'>
        <BasicLayout>
           {
                game !== undefined ? (
                   <>
                    <div className='container_game_search'>
                       <GameComponent game={game}/>
                        <div className='game_info'>
                            <h5 className='game_title'>{game.title}</h5>
                            <div className='game_summary'>
                                <p>{game.summary}</p>
                            </div>
                            <div className='game_price'>
                                <p>${game.price}  {(game.disccount > 0) &&  "-  " + game.disccount + "%  = " } <span>{(game.disccount > 0) && "$" + (game.price - (game.price * game.disccount) / 100).toFixed(2) }</span></p>
                            </div>
                            <div className='flex items-center justify-evenly mt-2'>
                            
                                <p>{(isFavoriteState.game) ? "Juego Agregado!" : "¡Agregalo a tus favoritos!" }</p>
                                    {
                                        (isFavoriteState.game) ? <AiFillHeart className='icon_favorite' size={22} onClick={() => toggleFavorite(false)}/> : <AiOutlineHeart onClick={() => toggleFavorite(true)} className='icon_norFavorite' size={22}/>
                                    }
                                    
                            </div>
                            <div className='flex items-center justify-evenly mt-2'>
                            
                                <button className='game_buy' onClick={() =>{
                                    
                                    addProduct(game.url);
                                    setreloadCart((prev) => !prev)
                                }
                                    }>Comprar</button>
                               
                                    
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-center items-center flex-col container_video'>
                        <h4 className='text-center text-2xl'>Thriller</h4>
                        <VideoComponent videoUrl={game.video}/>
                    </div>
                    <div className='w-full'>
                        <h4 className='text-center text-2xl'>ScreenShots</h4>
                       <Carousel images={game.screenshots} si/>
                    </div>
                   </>

                ):(
                     <div className='flex flex-col items-center justify-center  w-full h-screen'>
                        <p className='mb-5'>Cargando...</p>
                        <Loader type="Puff" color="#00BFFF" height={200} width={200} className="mb-24"/>
                    </div>
                )
            }
 
            
        </BasicLayout>
    </div>
  )
}

export default Game