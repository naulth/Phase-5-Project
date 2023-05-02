import {UserContext} from "../Context/user"
import React, {useContext} from 'react'



function FavoriteGame({gameImage, game, gameTitle}){

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
                })
            }
        })

    }

    return(
        <div>
			<button onClick={createFavorite} className="text-center hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-2 rounded my-1">Favorite Game</button>
		</div>

    )
}

export default FavoriteGame