import AddCommentReply from "./AddCommentReply"
import {useState} from 'react'
import EmptyReply from "./EmptyReply"
import ReplyCard from "./ReplyCard"
import AddProfileReply from './AddProfileReply'


function FollowedComment({content, score, gamename, username, image, user_id, comment_id, replies}){

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
        <div className="bg-zinc-800 border border-lime-200 shadow w-fit mx-auto p-4 my-4 ">
            <div className = "grid grid-cols-3 w-96">
                <div className="col-span-1">
                    <div className="text-left">
                        <h2 className=" text-lg font-bold tracking-tight text-lime-100">{username}</h2>
                        <img className="h-20 pb-2 mb-2" src={image} alt={username}/>
                        <AddProfileReply comment_id={comment_id} user_id={user_id} username={username}/>
                        {showReplies ?  <button onClick={toggleReplies} className="hover:bg-zinc-900 text-sm hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mt-2 shadow font-bold px-4">Close Replies</button> :
                        <button onClick={toggleReplies} className="hover:bg-zinc-900 text-sm hover:text-lime-100 text-lime-200 border py-1 w-36 border-lime-100 mt-2 shadow font-bold px-1">{`View Replies (${replies?.length}) `}</button> }
                    </div>
                    
                    
                    <div className="text-left mt-4">
                        {/* <AddCommentReply comment_id={comment_id} username={username}/> */}
                    </div>
                </div>
                <div className="col-span-2 ml-8">
                    <div className="text-left pb-4">
                        <h2 className="text-lg font-light tracking-tight text-lime-100">{gamename}</h2>
                    </div>
                    <div className="text-left">
                        <h2 className="text-lg font-semibold tracking-tight text-lime-200">{score} / 10</h2>
                    </div>    
                    <div className="text-left my-4">
                        <h2 className="text-lime-100">{content} </h2>
                    </div>
                </div>
                
                
                
            </div>
            <div>

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

export default FollowedComment