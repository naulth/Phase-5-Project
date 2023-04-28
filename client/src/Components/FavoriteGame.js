

function FavoriteGame({gameId, user, gameImage, gameTitle, addFavorite}){


	const createFavorite = (e) => {
        e.preventDefault()

        const newFavorite = {
            game_id: gameId,
            user_id: user.id,
            game_image: gameImage,
            game_title: gameTitle
        }

        fetch('/favorites', {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newFavorite)
        })

        addFavorite(newFavorite)
    }

    return(
        <div>
			<button onClick={createFavorite} className="text-center hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-2 rounded my-1">Favorite Game</button>
		</div>

    )
}

export default FavoriteGame