import React, {useState} from 'react'

function AddGameComment({addComment, gameId, game, user}){

	const [comment, setComment] = useState('')
    const [score, setScore] = useState('')


	const createComment = (e) => {
        e.preventDefault()

        const newComment = {
            score: score,
            content: comment,
            game_id: gameId,
            user_id: user.id,
            user_username: user.username,
            game_name: game.title
        }

        fetch('/comments', {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newComment)
        })

        addComment(newComment)

        setScore('')
        setComment('')
		toggleAddComment()
    }

	const [showAddComment, setShowAddComment] = useState(false)

	const toggleAddComment = () => {
		setShowAddComment(!showAddComment)
	}

    return(
		<div>
			<button onClick={toggleAddComment} className="text-center hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-2 rounded my-1">Add Comment</button>
		{showAddComment &&
        <div className="fixed top-0 left-0 w-full h-full bg-zinc-800 bg-opacity-50 flex justify-center items-center">
			<div className="max-w-2xl py-20 mx-auto rounded-2xl shadow-lg p-8 my-16 bg-zinc-800">
            <div>
                <h2 className="text-3xl py-4 px-4 font-bold tracking-tight text-gray-900">Add a Comment</h2>
            </div>
			<div>
				<form className="space-y-6" onSubmit={createComment}>
					<div className="">
						<label className="block text-sm font-medium leading-6 text-gray-900">Score: </label>
						<div className="mt-2">
							<input
								type="number"
								name="score"
								value={score}
								onChange={(e) => setScore(e.target.value)}
								className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
						<label className="block text-sm font-medium leading-6 text-gray-900">Comment: </label>
						<div className="mt-2">
							<input
								type="text"
								name="comment"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
						<button type="submit"className="flex w-full justify-center rounded-md bg-sky-950 px-3 my-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-200 hover:text-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200">Add Comment</button>
						<button onClick={toggleAddComment} className="flex w-full justify-center rounded-md bg-sky-950 px-3 my-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-200 hover:text-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200">Close Form</button>
					</div>
				</form>
			</div>
			</div>
        </div>
}
		</div>
    )
}

export default AddGameComment