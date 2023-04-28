import React, {useState} from 'react'
import GameCard from './GameCard'
import SearchGames from './SearchGames'
import {Link, Outlet} from 'react-router-dom'


function Games({gamesArray, commentsArray}){

    const [search, setSearch] = useState('')

    const byTitle = game => {
        if( game?.title.toLowerCase().includes(search)) {
        return true
        }
    }

    const byPlatform = game => {
        if( game?.platform.toLowerCase().includes(search)) {
        return true
        }
    }

    const gameSearch = game => {
        return byTitle(game) || byPlatform(game)
    }

    const searchedGames = gamesArray.filter(gameSearch)

    const changeSearch = newSearch => setSearch( newSearch.toLowerCase() )

    const gameComponents = searchedGames.map(game => <GameCard key={game.id} id={game.id} title={game.title} image={game.image} genre={game.genre} platform={game.platform} price={game.price} reviews={game.reviews} />)


    return(
        <div className="bg-zinc-800 h-full min-h-screen">
        <div className = "h-full max-w-8xl mx-auto">
            <div className="mx-auto border border-lime-100 bg-zinc-900 w-full p-8">
                <h1 className="text-center text-6xl font-bold leading-9 tracking-tight text-lime-200">The Library</h1>
                <div className="flex mt-10 justify-center">
                    <SearchGames changeSearch={changeSearch}/>
                </div>
            </div>
            
            
            <div className = " justify-items-center mt-10 grid max-w-8xl grid-cols-5 pb-10 gap-y-6 " >
                
            {gameComponents}

            </div>
        </div>
        </div>
    )
}

export default Games