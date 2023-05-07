import {Link, Outlet} from 'react-router-dom'
import AddGameReply from './AddGameReply'
import ViewReplies from './ViewReplies'

function GameCommentCard({content, score, username, game, user_id, user_image, game_id, replies, comment_id, theGame }){

    const linkURL = `/users/${user_id}`

    return(
        <div className="bg-zinc-900 border border-lime-200 mx-auto shadow w-4/5 h-fit p-4 my-4 ">
            <div className="flex flex-cols-3 ">
                <div className="col-span-1 pr-6">
                    <div className="">
                        <div className="text-left">
                            <h2 className="text-lg pb-4 font-bold tracking-tight text-lime-100">{username}</h2>
                        </div>
                        <img src={user_image} alt={username} className="h-20 mb-4" />
                        
                    </div>
                    <div className="grid grid-cols-1">
                        <button className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border w-36 py-1 mb-4 border-lime-100 shadow font-bold px-4"><Link to={linkURL}>View Profile</Link></button> <Outlet />
                        
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
                    <AddGameReply comment_id={comment_id} game_id={game_id} theGame={theGame} />
                    <ViewReplies user={username} game={game} replies={replies}/>
                </div>
            </div>
            
        </div>
    )
}

export default GameCommentCard
