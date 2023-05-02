import React, {useState} from 'react'

const FollowersContext = React.createContext()

function FollowersProvider({children}) {

    const [followersArray, setFollowersArray] = useState([])

    return <FollowersContext.Provider value={{followersArray, setFollowersArray}}>{children}</FollowersContext.Provider>
}

export {FollowersContext, FollowersProvider}