import {Outlet, Link} from 'react-router-dom'
import AddReply from './AddReply'
import ViewReplies from './ViewReplies'

function CommentCard({username, content, comment_id, replies, score, gameImage, game_id, userImage, game, user_id}) {

    const linkURL = `/users/${user_id}`
    const gameURL = `/games/${game_id}`

    return(
        <div className="bg-zinc-900 border border-lime-200 mx-auto shadow w-2/3 h-fit p-4 my-4 ">
            <div className="flex flex-cols-3 ">
                <div className="col-span-1 pr-6">
                    <div className="">
                        <div className="text-left">
                            <h2 className="text-lg pb-4 font-bold tracking-tight text-lime-100">{username}</h2>
                        </div>
                        <img src={userImage} alt={game} className="h-20 mb-4" />
                        
                    </div>
                    <div className="grid grid-cols-1">
                        <button className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 mb-4 border-lime-100 shadow font-bold px-4"><Link to={linkURL}>View Profile</Link></button> <Outlet />
                        <AddReply comment_id={comment_id}/>
                    </div>
                    
                </div>
                
                
                <div className="col-span-1 w-full">
                    <div className="">
                        <div className="text-left pt-2">
                            <h2 className="text-lg font-medium tracking-tight mb-4 text-lime-100">{game}</h2>
                        </div>
                        <div className="text-left my-4">
                            <h2 className="text-lime-100 mb-4">{content} </h2> 
                            <h2 className="text-lg font-semibold tracking-tight text-lime-200">{score} / 10</h2>
                        </div>
                    </div>
                </div>


                <div className="col-span-1 mx-auto justify-right mt-auto text-right">
                    <button className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mb-4 shadow font-bold px-4"><Link to={gameURL}>View Game</Link></button> <Outlet />
                    
                    <ViewReplies user={username} game={game} replies={replies}/>
                </div>
            </div>
            
                
        </div>
    )
}

export default CommentCard