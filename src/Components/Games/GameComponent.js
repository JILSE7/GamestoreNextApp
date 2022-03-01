import React from 'react'

const GameComponent = ({game}) => {

  
    console.log(game);
  return (
    <div className="container_game">
      {
        game !== undefined && <div className='delete'  style={{backgroundImage:`url(${game.poster.url})`, width:"100%", height:"100%", backgroundSize:"cover"}}></div>
      }
        
        <div className="container_title">
            <h3>{game.title}</h3>
        </div>
        <div className="container_price">
            <h5 className="price">${game.price}</h5>
        </div>{
          game && game.disccount > 0 &&
            <div className="container_disccount">
              <h5> -{game.disccount}%</h5>
            </div>
        }
    </div>
  )
}

export default GameComponent