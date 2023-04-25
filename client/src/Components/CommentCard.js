

function CommentCard({content, score, username}){

    console.log(content)
    return(
        <div className="bg-gray-100 rounded-2xl border shadow p-4 my-4 max-w-lg">
            <div className="py-4">
                <h2 className="flex-none text-3xl font-bold tracking-tight text-gray-900">{username}</h2>
            </div>
            <h2 className="mb-2 text-base leading-7 text-gray-600">{content} </h2>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900"> Rating: {score}</h2>
            
        </div>
    )
}

export default CommentCard


{/* <div class="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
        <p class="flex-none text-3xl font-bold tracking-tight text-gray-900">250k</p>
        <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
          <p class="text-lg font-semibold tracking-tight text-gray-900">Users on the platform</p>
          <p class="mt-2 text-base leading-7 text-gray-600">Vel labore deleniti veniam consequuntur sunt nobis.</p>
        </div>
      </div> */}