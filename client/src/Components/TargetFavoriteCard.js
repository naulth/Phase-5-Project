

function TargetFavoriteCard({image, title}){


    return(
        <div className='text-center shadow-lg h-100 pb-4 my-4 col-span-1 border border-lime-100 bg-zinc-900'>
            <div className="mx-auto pt-6 pb-2 justify-center items-center ">
                
            </div>
            <img src={image} alt={title} className='p-4 rounded-2xl mx-auto h-3/4'/>
            <div className="px-2">
                <h1 className='text-xl text-lime-100 font-medium'>{title}</h1>
            </div>
            
        </div>

    )
}

export default TargetFavoriteCard