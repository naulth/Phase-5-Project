import React from 'react'
import {Outlet, Link} from 'react-router-dom'

function GameCard({title, image, id, genre, platform, price, reviews}){

    const linkURL = `/games/${id}`

    return(
        <div className='mx-5 mb-8 w-84 border rounded shadow-md text-center'>
            <h1 className='p-4 text-xl font-medium'>{title}</h1>
            <img src={image} alt={title} className='flex h-2/3 mb-1'/>
            <button className="mx-2 my-4 hover:bg-slate-900 hover:text-white border shadow font-bold px-4 rounded">
                <Link to={linkURL}>View Game</Link>
            </button>
            
           <Outlet />
        </div>
        
    )
}

export default GameCard