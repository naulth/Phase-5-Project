

function UserCard({username, image}){

    return(
        <div className='text-center shadow-lg w-48 border border-lime-100 h-full bg-zinc-900'>
            <div className="mx-auto pt-6 pb-2 justify-center items-center ">
                <div className="px-2">
                    <h1 className='text-xl text-lime-100 font-medium'>{username}</h1>
                </div>
                
                <img src={image} alt={username} className='p-4 rounded-2xl mx-auto h-3/4'/>
                <button className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border border-lime-100 shadow font-bold px-4 rounded mx-2 mb-2">Add Friend</button>
                </div>
        </div>
        
    )
}

export default UserCard