import {Outlet, Link} from 'react-router-dom'

function CommentCard({username, content, score, gameImage, userImage, game, user_id}) {

    const linkURL = `/users/${user_id}`

    return(
        <div className="bg-zinc-900 border border-lime-200 mx-auto shadow w-1/3 h-fit p-4 my-4 ">
            <div className="grid grid-cols-3 p-4 ">
                <div className="col-span-1">
                <div className="text-left">
                        <h2 className="text-lg pb-4 font-bold tracking-tight text-lime-100">{username}</h2>
                    </div>
                    <img src={userImage} className="h-20 mb-4" />
                    <button className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border border-lime-100 shadow font-bold px-4"><Link to={linkURL}>View Profile</Link></button>
                    <Outlet />
                    
                    
                    
                </div>
                <div className="col-span-1">
                    <img src={gameImage}className="h-60 w-auto border border-lime-100" />
                </div>
                <div className="col-span-1 ml-4 ">
                    <div className="grid grid-rows-1 ">
                        <div className="text-left pt-2">
                            <h2 className="text-lg font-medium tracking-tight text-lime-100">{game}</h2>
                        </div>
                        <div className="text-left my-4">
                            <h2 className="text-lime-100">{content} </h2>
                        </div>
                        <div className="text-left">
                            <h2 className="text-lg font-semibold tracking-tight text-lime-200">{score} / 10</h2>
                        </div>
                    </div>
                </div>
                
            </div>
            
                
            </div>
    )
}

export default CommentCard