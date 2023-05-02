import React, {useState} from 'react'

const GamesArrayContext = React.createContext()

function GamesArrayProvider({children}) {

    const [gamesArray, setGamesArray] = useState([])

    return <GamesArrayContext.Provider value={{gamesArray, setGamesArray}}>{children}</GamesArrayContext.Provider>
}

export {GamesArrayContext, GamesArrayProvider}