import {useState} from 'react'
import ReplyCard from './ReplyCard'


function ViewReplies({replies, user, game}){

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
        <div>
            <button className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mb-4 shadow font-bold px-4" onClick={toggleReplies}>View All Replies</button>
            {showReplies &&
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800 bg-opacity-50 flex justify-center items-center">
                <div className=" bg-zinc-900 text-center border border-lime-100 shadow py-10 px-8 h-fit w-2/3">
                    <h1 className="text-3xl pb-8 px-4 font-bold tracking-tight text-lime-200"> Replies to {user} on {game} </h1>
                    <div className="grid grid-cols-4 gap-6 p-6">
                        {commentReplies}
                    </div>
                    <div className="   ">
                        <button className=" border border-lime-300 flex w-48 justify-center bg-zinc-800 px-3 py-1.5 mt-6 text-sm leading-6 text-lime-100  font-bold shadow-sm hover:bg-zinc-800 hover:text-lime-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200" onClick={toggleReplies}>Close</button>
                    </div>
                </div>        
            </div>
            }
        </div>
    )
}

export default ViewReplies