

function FavoriteCard({image, deleteFavorite, id, title}){

    const handleDeleteFavorite = (e) => {
        fetch(`/favorites/${id}`,{
        method: 'DELETE'
        })
        deleteFavorite(id)
    }


    return(
        <div className='text-center shadow-lg h-120 pb-4 my-4 col-span-1 border border-lime-100 bg-zinc-900'>
            <div className="mx-auto  pb-2 justify-center items-center ">
                
            </div>
            <img src={image} alt={title} className='p-4 rounded-2xl mx-auto h-3/4'/>
            <div className="px-2">
                <h1 className='text-xl text-lime-100 font-medium'>{title}</h1>
            </div>
            <button onClick={handleDeleteFavorite} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border border-lime-100 shadow font-bold px-4 rounded my-2 mx-2">
                Remove
            </button>
        </div>

    )
}

export default FavoriteCard