import {useState} from 'react'
import {Outlet, Link} from 'react-router-dom'
import AddCommentReply from './AddCommentReply'
import EmptyReply from './EmptyReply'
import ReplyCard from './ReplyCard'

function CommentCard({username, content, comment_id, replies, score, gameImage, game_id, userImage, game, user_id}) {

    const linkURL = `/users/${user_id}`
    const gameURL = `/games/${game_id}`

    const [showReplies, setShowReplies] = useState(false)

    const toggleReplies = () => {
        setShowReplies(!showReplies)
    }

    const byCreate = (commentA, commentB) => {
        return commentB?.created_at - commentA?.created_at

    }

    const sortedReplies = replies.slice().sort(byCreate).reverse()

    const commentReplies = sortedReplies.map(reply => <ReplyCard key={reply?.id} comment_id={reply?.comment_id} id={reply?.id} user_id={reply?.user_id} reply={reply?.reply} time={reply?.created_at} username={reply?.user_username}/>)

    return(
        <div>
        <div className="bg-zinc-950 border border-lime-200 mx-auto shadow w-2/3 h-full p-4 my-8">
            <div className="flex flex-cols-3 ">
                <div className="col-span-1 pr-6 mr-10">
                    <div className="">
                        <div className="text-left">
                            <h2 className="text-lg pb-4 font-bold tracking-tight text-lime-100">{username}</h2>
                        </div>
                        <img src={userImage} alt={game} className="w-24 mb-4" />
                        
                    </div>
                    <div className="grid grid-cols-1">
                        <button className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 mb-4 w-28 border-lime-100 shadow font-bold px-1"><Link to={linkURL}>View Profile</Link></button> <Outlet />
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
                
                        <AddCommentReply username={username} comment_id={comment_id}/>
                    <button className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mb-4 shadow font-bold px-4"><Link to={gameURL}>View Game</Link></button> <Outlet />
                    <button onClick={toggleReplies} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mb-4 shadow font-bold px-2">{`View Replies (${replies?.length}) `}</button>
                    {/* <ViewReplies user={username} game={game} replies={replies}/> */}
                </div>
            </div>
            
                
        </div>
        <div>
        { showReplies ? 
        <div>
            <div className="bg-zinc-950 mx-auto border border-lime-200 text-right w-1/2 h-fit p-4 my-4 ">
                {commentReplies?.length ? commentReplies : <EmptyReply />}
                <button onClick={toggleReplies} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mb-4 shadow font-bold px-4">Close Replies</button>
            </div>
        </div> : null}
        
    </div>
    </div>
    )
}

export default CommentCard