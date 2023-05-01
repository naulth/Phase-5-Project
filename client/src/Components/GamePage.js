import {Link, useParams} from 'react-router-dom'
import {useState, useEffect, useContext} from "react"

import GameCommentCard from './GameCommentCard'
import AddGameComment from './AddGameComment'
import FavoriteGame from './FavoriteGame'
import {UserContext} from "../Context/user"
import { CommentsContext } from '../Context/comments'

function GamePage({gamesArray, handleUpdate,  addFavorite}){

    const {user, setUser} = useContext(UserContext)
    const {commentsArray, setCommentsArray} = useContext(CommentsContext)
    

    const params = useParams()

    const id = params.gameId

    console.log(id)
    
    // useEffect(() => {
    //     Promise.all([
    //         fetch('/check_session'),
    //         fetch('/comments'),
    //     ])
    //     .then(([resSession, resComments]) =>
    //         Promise.all([resSession.json(), resComments.json()])
    //     )
    //     .then(([dataSession, dataComments]) => {
    //         setUser(dataSession)
    //         setCommentsArray(dataComments)
    //     })
    // }, [])

    const theGame = gamesArray.find(game => game.id == id)

    const game_id = theGame?.id

    // const game_title = theGame?.title

    // console.log(game_title)
    // console.log(game_id)

    const gameCommentArray = [...commentsArray]?.filter(comment => comment?.game_id == game_id)


    const byCreate = (commentA, commentB) => {
        return commentB.created_at - commentA.created_at
    }

    const sortedComponents = [...gameCommentArray]?.sort(byCreate).reverse()

    const gameComments = sortedComponents?.map(comment => <GameCommentCard key={theGame.id} username={comment?.user_username} score={comment?.score} content={comment?.content} create={comment?.created_at}/>)

    
    return(
        <div className = "">
            {/* <div className="text-center my-6">
                <button className="mx-2 my-4 hover:bg-slate-900 hover:text-white bg-white border shadow font-bold px-4 py-2 rounded"><Link to="/games">Back to Games</Link></button> 
            </div> */}
            <div className=" sm:py-32 justify-items-center grid max-w-8xl grid-cols-6 gap-x-2 gap-y-4 ">
                <div></div>
                <div className="mx-4 max-w-3xl px-8 lg:px-8 bg-sky-950 h-fit rounded-2xl border shadow p-4  w-80">
                    <div className="text-center">
                        <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200">{theGame?.title}</h1>
                    </div>
                    <div className="">
                        <img className="w-full rounded-2xl mx-auto border shadow" src={theGame?.image}/>
                    </div>
                    <div className="py-4 px-4 text-center">
                        <p className="text-lg font-bold tracking-tight text-white">Genre: {theGame?.genre} </p>
                        <p className="text-lg font-bold tracking-tight text-white">Platform: {theGame?.platform}</p>
                        <p className="text-lg font-bold tracking-tight text-white">Price: {theGame?.price}</p>
                    </div>
                    <div className="text-center">
                    <AddGameComment game={theGame} handleUpdate={handleUpdate}/>
                    <FavoriteGame gameId={game_id} theGame={theGame} addFavorite={addFavorite} gameTitle={theGame?.title} gameImage={theGame?.image}/>
                    </div>
                    {/* <div className="mx-auto text-center">
                    {favorite ? <button onClick={handleFavorite} className="hover:bg-sky-950 hover:text-lime-100 text-lime-100 border border-lime-100 shadow font-bold px-4 rounded mx-2">Favorited</button> : <button onClick={handleFavorite}className="hover:bg-sky-950 hover:text-lime-100 text-lime-100 border border-lime-100 shadow font-bold px-4 rounded mx-2">Favorite This Game</button> }
                    </div> */}
                    
                </div>
                
                <div className="mx-auto max-w-3xl px-8 mx-10 lg:px-8 col-span-2">

                    <div className="col-span-2 bg-sky-950 rounded-2xl border shadow p-4 my-4 w-108 h-fit">
                        <div className="text-center">
                            <h2 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200">Recent Comments</h2>
                        </div>
                        <div >
                            <div className="">
                                {gameComments}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mx-auto max-w-3xl px-8 mx-10 lg:px-8 col-span-2">
                    
                    
                </div>
            </div>
        </div>
    )
}



export default GamePage