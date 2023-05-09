import React from 'react'
import {Outlet, Link} from 'react-router-dom'

function GameCard({title, image, id, genre, platform, price, reviews}){

    const linkURL = `/games/${id}`

    return(
        <div className='text-center shadow-lg w-72 border border-lime-100 h-full bg-zinc-900'>
            <div className="mx-auto pt-6 pb-2 justify-center items-center ">
                
            </div>
            <img src={image} alt={title} className='px-4 pb-4 rounded-2xl mx-auto h-3/4'/>
            <div className="px-2">
                <h1 className='text-xl text-lime-100 font-medium'>{title}</h1>
            </div>
            <button className="hover:bg-zinc-800 hover:text-lime-100 text-lime-200 border mt-4 border-lime-100 shadow font-bold px-4 rounded mx-2">
                    <Link to={linkURL}>View Game</Link> 
                </button> 
           <Outlet />
        </div>
        
    )
}

export default GameCard