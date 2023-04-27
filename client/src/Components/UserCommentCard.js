import EditCommentForm from "./EditCommentForm"

function UserCommentCard({content, score, handleDeleteComment, editComment, commentId, gamename, user}){

    const handleDelete = (e) => {
        fetch(`/comments/${commentId}`,{
        method: 'DELETE'
        })
        handleDeleteComment(commentId)
    }

    function checkID(){
        console.log(commentId)
    }

    const theId = commentId

    return(
        <div className="bg-slate-600 rounded-2xl border border-lime-200 shadow p-4 my-4 max-w-lg">
            <div className="py-4">
                <h2 className="flex-none text-3xl font-bold tracking-tight text-lime-100">{gamename}</h2>
            </div>
            <h2 className="mb-2 text-base leading-7 text-white">{content} </h2>
            <h2 className="text-lg font-semibold tracking-tight text-lime-200">{score} / 10</h2>
            <div className="text-right">
                <EditCommentForm id={commentId} theId={theId} editComment={editComment} user={user}/>
            </div>
            <div className="text-right">
                <button onClick={handleDelete} className="text-center hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-2 rounded my-1">Delete Comment</button>
            </div>
        </div>
    )
}

export default UserCommentCard