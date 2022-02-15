import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getGameUrl } from '../api/game'
import BasicLayout from '../Components/Layouts/BasicLayout'
import GameComponent from '../Components/Games'
import Carousel from '../Components/Carousel'


const Game = () => {

    const {query} = useRouter()
    console.log(query);
    const [game, setGame] = useState(undefined);
    console.log(game);
    
    useEffect(() => {
        if(query.game){
            getGameUrl(query.game).then((data) => setGame({...data[0]}))
                             .catch(console.log)
        }
    }, [query])
    
    

  return (
    <div className='container'>
        <BasicLayout>
            {
                game ? (
                   <>
                    <div className='container_game_search'>
                        {game && <GameComponent game={game}/>}
                        <div className='game_info'>
                            <h5 className='game_title'>{game.title}</h5>
                            <div className='game_summary'>
                                <p>{game.summary}</p>
                            </div>
                            <div className='game_price'>
                                <p>${game.price}  {(game.disccount > 0) &&  "-  " + game.disccount + "%  = " } <span>{(game.disccount > 0) && "$" + (game.price - (game.price * game.disccount) / 100).toFixed(2) }</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        {game && <Carousel images={game.screenshots}/>}
                    </div>
                   </>

                ):(
                    <></>
                )
            }
 
            
        </BasicLayout>
    </div>
  )
}

export default Game