
import {useState} from 'react'
import ReplyCard from './ReplyCard'
import EmptyReply from './EmptyReply'
import AddTargetReply from './AddTargetReply'

function TargetCommentCard({gamename, content, score, replies, commentId, username, target_id}) {

    const [showReplies, setShowReplies] = useState(false)

    const toggleReplies = () => {
        setShowReplies(!showReplies)
    }


    const byCreate = (commentA, commentB) => {
        return commentB?.created_at - commentA?.created_at

    }

    const sortedReplies = replies.slice().sort(byCreate).reverse()

    const commentReplies = sortedReplies.map(reply => <ReplyCard key={reply?.id} id={reply?.id} target_id={target_id} comment_id={reply?.comment_id} reply={reply?.reply} user_id={reply?.user_id} time={reply?.created_at} username={reply?.user_username}/>)


    return(
        <div>
        <div className="bg-zinc-800 border border-lime-200 shadow w-54 p-4 my-4 ">
                <div className="grid grid-rows-1 ">
                    <div className="text-left">
                        <h2 className=" float-left text-lg font-bold tracking-tight text-lime-100">{gamename}</h2>
                    </div>
                    <div className="text-left my-4">
                        <h2 className="text-lime-100">{content} </h2>
                    </div>
                    <div className="text-left">
                        <h2 className="text-lg font-semibold tracking-tight text-lime-200">{score} / 10</h2>
                    </div>
                </div>
                <div className="text-right">
                    <AddTargetReply comment_id={commentId} username={username}/>
                    {showReplies ?  <button onClick={toggleReplies} className="hover:bg-zinc-900 hover:text-lime-100 text-sm text-lime-200 my-1 border py-1 border-lime-100 shadow font-bold px-1">Close Replies</button> :
                        <button onClick={toggleReplies} className="hover:bg-zinc-900 hover:text-lime-100 text-lime-200 text-sm border my-1 py-1 w-36 border-lime-100 shadow font-bold px-1">{`View Replies (${replies?.length}) `}</button> }
                </div>
        </div>
            { showReplies ? 
                <div>
                    <div className="bg-zinc-900 mx-auto border border-lime-200 text-right w-2/3 h-fit p-4 my-4 ">
                        {commentReplies?.length ? commentReplies : <EmptyReply />}
                        <button onClick={toggleReplies} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mb-4 shadow font-bold px-4">Close Replies</button>
                    </div>
                </div> 
            : null}
        </div>
    )
}

export default TargetCommentCard