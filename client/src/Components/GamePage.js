import {Link, useParams} from 'react-router-dom'
import {useState, useEffect} from "react"

import CommentCard from './CommentCard'

function GamePage({user}){

    const params = useParams()

    const id = params.gameId

    const [game, setGame] = useState({})

    useEffect(() => {
        fetch('/games/' + `${id}`)
            .then(r => r.json())
            .then(setGame)
    },[])

    const commentComponents = game?.comments?.map(comment => <CommentCard key={game.id} username={comment.user_username} score={comment.score} content={comment.content}/>)


    const [comment, setComment] = useState('')
    const [score, setScore] = useState('')

    const createComment = (e) => {

        const newComment = {
            score: score,
            content: comment,
            game_id: id,
            user_id: user.id,
            user_username: user.username
        }

        fetch('/comments', {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newComment)
        })

        setScore('')
        setComment('')
    }


    return(
        <div>
            <div className="text-center my-6">
                <button className="mx-2 my-4 hover:bg-slate-900 hover:text-white border shadow font-bold px-4 rounded"><Link to="/games">Back to Games</Link></button> 
            </div>
            <div className="py-24 sm:py-32 justify-items-center grid max-w-8xl grid-cols-6 gap-x-2 gap-y-4 ">
                <div className="mx-auto max-w-3xl px-8 mx-10 lg:px-8 col-span-2">
                    <div className="text-center">
                        <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-gray-900">{game && game.title}</h1>
                    </div>
                    <div className="">
                        <img className="w-2/3 rounded-2xl mx-auto border shadow" src={game && game.image}/>
                    </div>
                    <div className="py-4 px-4 text-center">
                        <p className="text-lg font-bold tracking-tight text-gray-900">Genre: {game && game.genre} </p>
                        <p className="text-lg font-bold tracking-tight text-gray-900">Platform: {game && game.platform}</p>
                        <p className="text-lg font-bold tracking-tight text-gray-900">Price: {game && game.price}</p>
                    </div>
                </div>
                <div className="mx-auto max-w-3xl px-8 mx-10 lg:px-8 col-span-2">
                    <div className="text-center">
                        <h2 className="text-3xl py-4 px-4 font-bold tracking-tight text-gray-900">Comments</h2>
                    </div>
                    <div className="max-w-md">
                    {commentComponents}
                    </div>
                </div>
                <div className="mx-auto max-w-3xl px-8 mx-10 lg:px-8 col-span-2">
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
                            <button type="submit" className="flex w-full justify-center rounded-md bg-sky-950 px-3 my-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-200 hover:text-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200">Add Comment</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default GamePage