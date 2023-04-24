import React from 'react'

function GameCard({title, image, id, genre, platform, price, reviews}){


    return(
        <div className='mx-5 mb-8 w-84 border rounded shadow-md text-center '>
            <h1 className='p-4 text-xl font-medium'>{title}</h1>
            <img src={image} alt={title} className='flex  h-2/3 mb-1'/>
            <button className="mx-2 my-4 hover:bg-slate-900 hover:text-white border shadow font-bold px-4 rounded">View Game</button>
    
                
            {/* <p>{genre}</p>
            <p>{platform}</p>
            <p>{price}</p> */}
        
        </div>
    )
}

export default GameCard