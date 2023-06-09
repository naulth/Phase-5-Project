import React, {useState, useContext, useEffect} from 'react'
import {CommentsContext} from "../Context/comments"
import CommentCard from './CommentCard'
import EmptyComment from './EmptyComment'
import SearchComments from './CommentSearch'

function CommentFeed(){

    const {commentsArray, setCommentsArray} = useContext(CommentsContext)
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch('/comments')
        .then((res) => {
            if (res.ok) {
                res.json().then((r) => {
                    setCommentsArray(r)
                })
            }
        })
    },[])


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


    const commentComponents = searchedComments?.map(comment => <CommentCard key={comment?.id} username={comment?.user_username} comment_id={comment?.id} userImage={comment?.user_image} content={comment?.content} score={comment?.score} gameImage={comment?.game_image} game={comment?.game_name} user_id={comment?.user_id} replies={comment?.replies} game_id={comment?.game_id} />)

    return(
        
        <div className="bg-zinc-900 h-full min-h-screen">
                <div className="mx-auto border border-lime-100 bg-zinc-900 w-full p-8">
                    <h1 className="text-center text-6xl font-bold leading-9 tracking-tight text-lime-200">The Feed</h1>
                    <div className="flex mt-10 justify-center">
                    <SearchComments changeSearch={changeSearch}/>
                </div>
                </div>
                <div className="w-1/2 mx-auto">
                    {commentComponents?.length ? commentComponents : <EmptyComment />}
                </div>
                
        </div>
        
    )
}

export default CommentFeed