import {useState} from 'react'
import {Link, Outlet} from 'react-router-dom'
import ReplyCard from './ReplyCard'
import AddGameReply from './AddGameReply'
import ViewReplies from './ViewReplies'
import EmptyReply from './EmptyReply'

function GameCommentCard({content, score, username, game, user_id, user_image, game_id, replies, comment_id, theGame }){

    const linkURL = `/users/${user_id}`

    const [showReplies, setShowReplies] = useState(false)

    const toggleReplies = () => {
        setShowReplies(!showReplies)
    }


    const byCreate = (commentA, commentB) => {
        return commentB?.created_at - commentA?.created_at

    }

    const sortedReplies = replies.slice().sort(byCreate).reverse()

    const commentReplies = sortedReplies.map(reply => <ReplyCard key={reply?.id} reply={reply?.reply} time={reply?.created_at} username={reply?.user_username}/>)

    return(
        <div className="">
            <div className="bg-zinc-900 border border-lime-200 ml-8 shadow w-5/6 h-fit p-4 my-4 ">
                <div className="flex flex-cols-3 ">
                    <div className="col-span-1 mr-16">
                        <div className="">
                            <div className="text-left">
                                <h2 className="text-lg pb-4 font-bold tracking-tight text-lime-100">{username}</h2>
                            </div>
                            <img src={user_image} alt={username} className="w-24 mb-4" />
                            
                        </div>
                        <div className="grid grid-cols-1">
                            <button className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border w-28 py-1 mb-4 border-lime-100 shadow font-bold "><Link to={linkURL}>View Profile</Link></button> <Outlet />
                        </div>
                        
                    </div>
                    
                    
                    <div className="col-span-1 w-full mr-2">
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
                        {showReplies ?  <button onClick={toggleReplies} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mb-4 shadow font-bold px-4">Close Replies</button> :
                        <button onClick={toggleReplies} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mb-4 shadow font-bold px-4">View Replies</button> }
                        
                    </div>
                </div>
            </div>
            <div>
                { showReplies ? 
                <div>
                    <div className="bg-zinc-900 mx-auto border border-lime-200 text-right w-2/3 h-fit p-4 my-4 ">
                        {commentReplies?.length ? commentReplies : <EmptyReply />}
                        <button onClick={toggleReplies} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mb-4 shadow font-bold px-4">Close Replies</button>
                    </div>
                </div> : null}
                
            </div>
        </div>
    )
}

export default GameCommentCard

