import {Link, useParams} from 'react-router-dom'
import {useState, useEffect} from "react"

import GameCommentCard from './GameCommentCard'

function GamePage({user, handleUpdate}){

    const params = useParams()

    const id = params.gameId

    const [game, setGame] = useState({})

    useEffect(() => {
        fetch('/games/' + `${id}`)
            .then(r => r.json())
            .then(setGame)
    },[])

    const [commentsArray, setCommentsArray] = useState([])


    useEffect(()=>{
        fetch('/games/' + `${id}`)
            .then(r => r.json())
            .then(r => setCommentsArray(r.comments))
    },[])

    

    const commentComponents = commentsArray.map(comment => <GameCommentCard key={game.id} username={comment.user_username} score={comment.score} content={comment.content}/>)



    const [comment, setComment] = useState('')
    const [score, setScore] = useState('')

    const createComment = (e) => {
        e.preventDefault()

        const newComment = {
            score: score,
            content: comment,
            game_id: id,
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
        handleUpdate(user)
    }

    const addComment = (newCommentObj) => {
        setCommentsArray([...commentsArray, newCommentObj])
    }

    // const favorite = game.favorite

    // const favoriteGame = (game) => {
            
    //     const newGame = {...game} 

    //     newGame.favorite = !favorite

    //     setGame(newGame)
    // }

    // const handleFavorite = () => {

    //     favoriteGame(game)

    //     fetch('/games/' + `${id}` , {
	// 		method: "PATCH",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			favorite: !favorite
	// 		})
	// 	})
    // }

    return(
        <div className = "">
            <div className="text-center my-6">
                <button className="mx-2 my-4 hover:bg-slate-900 hover:text-white bg-white border shadow font-bold px-4 py-2 rounded"><Link to="/games">Back to Games</Link></button> 
            </div>
            <div className=" sm:py-32 justify-items-center grid max-w-8xl grid-cols-6 gap-x-2 gap-y-4 ">
                <div></div>
                <div className="mx-auto max-w-3xl px-8 mx-10 lg:px-8 col-span-2 bg-gray-800 rounded-2xl border shadow p-4 my-4 w-80">
                    <div className="text-center">
                        <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-white">{game && game.title}</h1>
                    </div>
                    <div className="">
                        <img className="w-full rounded-2xl mx-auto border shadow" src={game && game.image}/>
                    </div>
                    <div className="py-4 px-4 text-center">
                        <p className="text-lg font-bold tracking-tight text-white">Genre: {game && game.genre} </p>
                        <p className="text-lg font-bold tracking-tight text-white">Platform: {game && game.platform}</p>
                        <p className="text-lg font-bold tracking-tight text-white">Price: {game && game.price}</p>
                    </div>
                    {/* <div className="mx-auto text-center">
                    {favorite ? <button onClick={handleFavorite} className="hover:bg-sky-950 hover:text-lime-100 text-lime-100 border border-lime-100 shadow font-bold px-4 rounded mx-2">Favorited</button> : <button onClick={handleFavorite}className="hover:bg-sky-950 hover:text-lime-100 text-lime-100 border border-lime-100 shadow font-bold px-4 rounded mx-2">Favorite This Game</button> }
                    </div> */}
                    
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
                    <div className="text-center">
                        <h2 className="text-3xl py-4 px-4 font-bold tracking-tight text-gray-900">Recent Comments</h2>
                    </div>
                    <div className="max-w-md">
                    {commentComponents}
                    </div>
                </div>
                <div className="mx-auto max-w-3xl px-8 mx-10 lg:px-8 col-span-2">
                    
                    
                </div>
            </div>
        </div>
    )
}



export default GamePage