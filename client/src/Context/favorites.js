import React, {useState} from 'react'

const FavoritesContext = React.createContext()

function FavoritesProvider({children}) {

    const [favoritesArray, setFavoritesArray] = useState([])

    return <FavoritesContext.Provider value={{favoritesArray, setFavoritesArray}}>{children}</FavoritesContext.Provider>
}

export {FavoritesContext, FavoritesProvider}