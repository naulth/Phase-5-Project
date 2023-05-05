

function ReplyCard({reply, username, time}){


    return(
        <div className="bg-zinc-800 border border-lime-200 shadow w-48 p-2 my-1 ">
                <div className="grid grid-rows-1 ">
                    <div className="text-left">
                        <h2 className=" float-left text-lg font-bold tracking-tight text-lime-100">{username}</h2>
                    </div>
                    <div className="text-left my-4">
                        <h2 className="text-lime-100">{reply} </h2>
                    </div>
                </div>
        </div>
    )
}

export default ReplyCard