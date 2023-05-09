import React, {useState} from 'react'

const TargetUserContext = React.createContext()

function TargetUserProvider({children}) {

    const [targetUser, setTargetUser] = useState(null)

    

    return <TargetUserContext.Provider value={{targetUser, setTargetUser}}>{children}</TargetUserContext.Provider>
}

export {TargetUserContext, TargetUserProvider}