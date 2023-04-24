import React from 'react'
import GameCard from './GameCard'

function Games({gamesArray}){

    const gameComponents = gamesArray.map(game => <GameCard key={game.id} id={game.id} title={game.title} image={game.image} genre={game.genre} platform={game.platform} price={game.price} reviews={game.reviews}/>)

    return(
        <div className = "py-24 max-w-7xl mx-auto ">
            <div className = " justify-items-center grid max-w-7xl grid-cols-3 gap-x-2 gap-y-4 " >
            {gameComponents}
            </div>
        </div>
    )
}

export default Games