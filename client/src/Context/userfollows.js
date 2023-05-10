import React, {useState} from 'react'

const UserFollowsContext = React.createContext()

function UserFollowsProvider({children}) {

    const [userFollows, setUserFollows] = useState([])

    

    return <UserFollowsContext.Provider value={{userFollows, setUserFollows}}>{children}</UserFollowsContext.Provider>
}

export {UserFollowsContext, UserFollowsProvider}