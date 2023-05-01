import React, {useState} from 'react'

const UsersArrayContext = React.createContext()

function UsersArrayProvider({children}) {

    const [usersArray, setUsersArray] = useState([])

    return <UsersArrayContext.Provider value={{usersArray, setUsersArray}}>{children}</UsersArrayContext.Provider>
}

export {UsersArrayContext, UsersArrayProvider}