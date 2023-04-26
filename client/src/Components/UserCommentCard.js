

function UserCommentCard({content, score, gamename}){


    return(
        <div className="bg-gray-600 rounded-2xl border border-lime-200 shadow p-4 my-4 max-w-lg">
            <div className="py-4">
                <h2 className="flex-none text-3xl font-bold tracking-tight text-lime-100">{gamename}</h2>
            </div>
            <h2 className="mb-2 text-base leading-7 text-white">{content} </h2>
            <h2 className="text-lg font-semibold tracking-tight text-lime-200">{score} / 10</h2>
            
        </div>
    )
}

export default UserCommentCard