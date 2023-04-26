

function GameCommentCard({content, score, username}){

    return(
        <div className="bg-gray-100 rounded-2xl border shadow p-4 my-4 w-72">
            <div className="py-4">
                <h2 className="flex-none underline text-3xl font-bold tracking-tight text-gray-900">{username}</h2>
            </div>
            <h2 className="mb-2 text-base leading-7 text-gray-600">{content} </h2>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900"> Rating: {score} / 10</h2>
            
        </div>
    )
}

export default GameCommentCard