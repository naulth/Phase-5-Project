import EditCommentForm from "./EditCommentForm"

function UserCommentCard({content, score, handleDeleteComment, editComment, commentId, game_id, gamename, user}){

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
        <div className="bg-zinc-800 border border-lime-200 shadow p-4 my-4">
            <div className="">
            <div className="py-1">
                <h2 className=" float-left text-lg font-bold tracking-tight text-lime-100">{gamename}</h2>
            </div>
            
            <div className="float-left">
                <h2 className="text-left text-lime-100">{content} </h2>
            </div>
            
            <div className="float-left">
            <h2 className="text-lg font-semibold tracking-tight text-lime-200">{score} / 10</h2>
            </div>
            </div>
            
                <div className="pt-8">
                <div className="text-right ">
                    <EditCommentForm theId={theId} gamename={gamename} game_id={game_id} editComment={editComment} user={user}/>
                </div>
                <div className="text-right">
                    <button onClick={handleDelete} className="text-center hover:bg-sky-950 hover:text-lime-200 text-sm w-20 text-lime-200 border border-lime-200 shadow font-bold py-1 px-1 rounded my-1">Delete</button>
                </div>
                </div>
        </div>
    )
}

export default UserCommentCard