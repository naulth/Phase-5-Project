import {Link, useParams} from 'react-router-dom'
import {useState, useEffect, useContext} from "react"

import GameCommentCard from './GameCommentCard'
import AddGameComment from './AddGameComment'
import FavoriteGame from './FavoriteGame'
import {UserContext} from "../Context/user"
import { GameContext } from '../Context/game'

function GamePage({handleUpdate,  addFavorite}){

    const {user, setUser} = useContext(UserContext)
    const {game, setGame} = useContext(GameContext)

    const params = useParams()

    const id = params.gameId
    
    useEffect(() => {
        fetch(`/games/${id}`)
        .then((res) => {
            if (res.ok) {
                res.json().then((r) => {
                    setGame(r)
                })
            } else {
                console.log('game fetched not ok')
            }
        })
    },[])

    const MAX_COMMENTS = 5

    const byCreate = (commentA, commentB) => {
        return commentB.created_at - commentA.created_at
    }

    const sortedComponents = game?.comments?.slice(0, MAX_COMMENTS).sort(byCreate).reverse()

    const gameComments = sortedComponents?.map(comment => <GameCommentCard comment_id={comment?.id} game_id={game?.id} user_image={comment?.user_image} key={comment?.id} user_id={comment?.user_id} game={game?.title} username={comment?.user_username} score={comment?.score} content={comment?.content} create={comment?.created_at} replies={comment?.replies} theGame={game} />)

    
    return(
        <div className = "h-fit bg-zinc-900 min-h-screen">
            <div className="mx-auto border border-lime-100 bg-zinc-900 w-full text-center p-8">
                <h1 className="text-center text-6xl font-bold leading-9 tracking-tight text-lime-200 py-2">{game?.title}</h1>
                <button className="text-center hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-2 rounded mt-8"><Link to="/games">Back to Library</Link></button>
            </div>

            <div className="justify-items-center grid max-w-8xl grid-cols-5 gap-x-2 gap-y-4 ">
                <div></div>
                <div className=" max-w-3xl px-8 lg:px-8 bg-zinc-950 h-fit border border-lime-100 p-4 col-span-1">
                    {/* <div className="text-center">
                        <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200">{game?.title}</h1>
                    </div> */}
                    <div className="">
                        <img className="mx-auto h-96 mx-auto border border-lime-100" src={game?.image}/>
                    </div>
                    {/* <div className="py-4 px-4 text-center">
                        <p className="text-lg font-bold tracking-tight text-white">Genre: {game?.genre} </p>
                        <p className="text-lg font-bold tracking-tight text-white">Platform: {game?.platform}</p>
                        <p className="text-lg font-bold tracking-tight text-white">Price: {game?.price}</p>
                    </div> */}
                    <div className="justify-center py-4 flex flex-row gap-2">
                    <AddGameComment game={game} user={user} setGame={setGame} gameId={game?.id} handleUpdate={handleUpdate}/>
                    <FavoriteGame gameId={game?.id} game={game} addFavorite={addFavorite} gameTitle={game?.title} gameImage={game?.image}/>
                    </div>
                </div>
                {/* <div className="col-span-2 bg-zinc-950 h-fit p-6 border border-lime-100">
                    <img className="w-full h-96 mx-auto border border-lime-100" src={game?.image}/>
                </div> */}
                <div className="mx-auto bg-zinc-950 border border-lime-100 col-span-2">
                    <div className="p-4 my-4 h-fit">
                        <div>
                            <div className="ml-6">
                                <h2 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200">Recent Comments</h2>
                            </div>
                            <div className="">
                                {gameComments}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="bg-zinc-950 border border-lime-100 col-span-1">
                    <div className="p-4 my-4 h-fit">
                        <div>
                            <div className="">
                                <h2 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200">Recent Comments</h2>
                            </div>
                            <div className="">
                                {gameComments}
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}



export default GamePage