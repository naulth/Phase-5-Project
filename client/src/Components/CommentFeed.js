import React, {useState, useContext} from 'react'
import {CommentsContext} from "../Context/comments"
import CommentCard from './CommentCard'
import SearchComments from './CommentSearch'

function CommentFeed(){

    const {commentsArray} = useContext(CommentsContext)
    const [search, setSearch] = useState('')


    const byCreate = (commentA, commentB) => {
        return commentB?.created_at - commentA?.created_at

    }

    const sortedComponents = commentsArray?.slice().sort(byCreate).reverse()


    

    const byUser = comment => {
        if( comment?.user_username?.toLowerCase().includes(search)) {
            return true
        }
    }

    const byGame = comment => {
        if( comment?.game_name.toLowerCase().includes(search)) {
            return true
        }
    }

    const commentSearch = comment => {
        return byUser(comment) || byGame(comment)
    }

    const searchedComments = sortedComponents.filter(commentSearch)

    const changeSearch = newSearch => setSearch( newSearch.toLowerCase() )




    const commentComponents = searchedComments?.map(comment => <CommentCard key={comment?.id} username={comment?.user_username} userImage={comment?.user_image} content={comment?.content} score={comment?.score} gameImage={comment?.game_image} game={comment?.game_name} user_id={comment?.user_id}/>)

    return(
        
        <div className="bg-zinc-800 h-full min-h-screen">
                <div className="mx-auto border border-lime-100 bg-zinc-900 w-full p-8">
                    <h1 className="text-center text-6xl font-bold leading-9 tracking-tight text-lime-200">The Feed</h1>
                    <div className="flex mt-10 justify-center">
                    <SearchComments changeSearch={changeSearch}/>
                </div>
                </div>
                <div className="">
                    {commentComponents}
                </div>
                
        </div>
        
    )
}

export default CommentFeed