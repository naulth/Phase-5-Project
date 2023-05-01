import React, {useState} from 'react'

const CommentsContext = React.createContext()

function CommentsProvider({children}) {

    const [commentsArray, setCommentsArray] = useState([])

    return <CommentsContext.Provider value={{commentsArray, setCommentsArray}}>{children}</CommentsContext.Provider>
}

export {CommentsContext, CommentsProvider}