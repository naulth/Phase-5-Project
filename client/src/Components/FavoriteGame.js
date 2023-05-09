import {UserContext} from "../Context/user"
import React, {useContext, useState} from 'react'



function FavoriteGame({gameImage, game, gameTitle}){

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const {user, setUser} = useContext(UserContext)

	const createFavorite = (e) => {
        e.preventDefault()

        const newFavorite = {
            game_id: game?.id,
            user_id: user.id,
            game_image: gameImage,
            game_title: gameTitle
        }

        fetch('/favorites', {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newFavorite)
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((response) => {
                    const newUser = {
                        ...user,
                        favorites: [
                            ...user?.favorites, response 
                        ]
                    }
                    setUser(newUser)
                    toggleModal()
                })
            }
        })

    }

    return(
        <div>
            <div>
                <button onClick={createFavorite} className="text-center hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-2 rounded my-1">Favorite Game</button>
            </div>
            {showModal &&
                <div className="fixed top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-50 flex justify-center items-center">
                    <div className=" bg-zinc-900 text-center border border-lime-100 shadow py-10 px-8 h-fit w-1/4">
                        <h2 className="text-3xl pb-2 px-4 font-bold tracking-tight text-lime-200"> {gameTitle}</h2>
                        <p className="text-lime-100">Has Been Favorited Successfully</p>
                        <button className=" border border-lime-300 w-24 justify-center bg-zinc-800 px-1 py-1.5 mt-6 text-sm leading-6 text-lime-100  font-bold hover:bg-zinc-900 hover:text-lime-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200" onClick={toggleModal}>Close</button>
                    </div>        
                </div>
            }
        </div>
    )
}

export default FavoriteGame