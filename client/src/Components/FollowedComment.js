

function FollowedComment({content, score, gamename, username}){


    return(
        <div className="bg-zinc-800 border border-lime-200 shadow w-54 p-4 my-4 ">
                <div className="grid grid-rows-1 ">
                    <div className="text-left">
                        <h2 className=" float-left text-lg font-bold tracking-tight text-lime-100">{username}</h2>
                    </div>
                    <div className="text-left">
                        <h2 className=" float-left text-lg font-light tracking-tight text-lime-100">{gamename}</h2>
                    </div>
                    
                    <div className="text-left my-4">
                        <h2 className="text-lime-100">{content} </h2>
                    </div>
                    <div className="text-left">
                        <h2 className="text-lg font-semibold tracking-tight text-lime-200">{score} / 10</h2>
                    </div>
                </div>
        </div>
    )
}

export default FollowedComment