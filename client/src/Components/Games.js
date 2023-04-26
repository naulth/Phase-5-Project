import React, {useState} from 'react'
import GameCard from './GameCard'
import {Link, Outlet} from 'react-router-dom'


function Games({gamesArray}){


    const gameComponents = gamesArray.map(game => <GameCard key={game.id} id={game.id} title={game.title} image={game.image} genre={game.genre} platform={game.platform} price={game.price} reviews={game.reviews} />)


    return(
        <div className = "py-24 max-w-8xl mx-auto ">
            <div className = " justify-items-center grid max-w-8xl grid-cols-5 gap-x-1 gap-y-6 " >
            {gameComponents}

            </div>
        </div>
    )
}

export default Games