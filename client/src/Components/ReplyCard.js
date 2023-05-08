

function ReplyCard({reply, username, time}){


    return(
        <div className="bg-zinc-900 border border-lime-200 shadow  p-2 my-6 my-1 ">
                <div className="flex flex-rows-1 ">
                    <div className="text-left">
                        <h2 className="text-lg font-bold tracking-tight text-lime-100">{username}</h2> 
                        <h2 className="text-lime-100">{reply} </h2>
                    </div>
                </div>
        </div>
    )
}

export default ReplyCard