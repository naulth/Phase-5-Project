import React from 'react'
import {Outlet, Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function GameCard({title, image, id, genre, platform, price, reviews}){

    const linkURL = `/games/${id}`

    return(
        <div className='text-center rounded-2xl shadow-lg w-72 h-full bg-sky-950'>
            <img src={image} alt={title} className='p-4 rounded-2xl mx-auto h-3/4'/>
            <div className="px-6 py-4">
                <h1 className='text-xl text-white font-medium'>{title}</h1>
            </div>
            <div className="mx-auto justify-center items-center ">
                <button className="hover:bg-sky-950 hover:text-lime-100 text-lime-100 border border-lime-100 shadow font-bold px-4 rounded mx-2">
                    <Link to={linkURL}>View Game</Link> 
                </button> 
            </div>
           <Outlet />
        </div>
        
    )
}

export default GameCard