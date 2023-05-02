import React, {useState} from 'react'

const GameContext = React.createContext()

function GameProvider({children}) {

    const [game, setGame] = useState({})

    return <GameContext.Provider value={{game, setGame}}>{children}</GameContext.Provider>
}

export {GameContext, GameProvider}