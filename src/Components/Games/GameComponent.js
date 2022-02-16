import React from 'react'

const GameComponent = ({game}) => {

  
    
  return (
    <div className="container_game">
        <div style={{backgroundImage:`url(${game.poster.url})`, width:"100%", height:"100%", backgroundSize:"cover"}}></div>
        
        <div className="container_title">
            <h3>{game.title}</h3>
        </div>
        <div className="container_price">
            <h5 className="price">${game.price}</h5>
        </div>
            <div className="container_disccount">
            <h5> -{game.disccount}%</h5>
        </div>
    </div>
  )
}

export default GameComponent