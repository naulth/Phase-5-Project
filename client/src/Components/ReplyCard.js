
import {useState, useContext, useEffect} from 'react'
import {UserContext} from "../Context/user"
import { CommentsContext } from '../Context/comments'
import { GameContext } from '../Context/game'
import { TargetUserContext } from '../Context/targetUser'


function ReplyCard({reply, username, time, id, user_id, game_id, target_id, comment_id}){


    const [showDelete, setShowDelete] = useState(false)
    const {user, setUser} = useContext(UserContext)
    const {commentsArray, setCommentsArray} = useContext(CommentsContext)
    const {game, setGame} = useContext(GameContext)
    const {targetUser, setTargetUser} = useContext(TargetUserContext)


    const handleDeleteReply = (e) => {
        fetch(`/deletereply/${id}`,{
        method: 'DELETE'
        })

        //update state for user comments on profile
        const updatedUser = {
            ...user,
            comments: user?.comments?.map(comment => {
                if (comment.id === comment_id) {
                    return {
                        ...comment,
                        replies: comment.replies.filter(reply => reply.id !== id)
                    }
                } else {
                    return comment
                }
            })
        }
        setUser(updatedUser)

        //update state of game comment's replies on game page
        const commentToUpdate = game?.comments?.find((comment) =>
            comment?.replies?.some((reply) => reply.id === id)
            )

        if (commentToUpdate) {
            
            const updatedReplies = commentToUpdate?.replies?.filter(
                (reply) => reply.id !== id
            )

           
            const updatedComment = { ...commentToUpdate, replies: updatedReplies }

           
            const updatedGameComments = game?.comments?.map((comment) =>
                comment === commentToUpdate ? updatedComment : comment
            )

            setGame({ ...game, comments: updatedGameComments })
        }


        //update state for comment feed
        setCommentsArray(commentsArray.map(comment => {
            if (comment.id === comment_id) {
                return {
                    ...comment,
                    replies: comment.replies.filter(reply => reply.id !== id)
                }
            } else {
                return comment
            }
        }))

        //update state for followed user comments
        const followerToUpdate = user?.following?.find((follower) =>
            follower?.comments?.some((comment) =>
            comment?.replies?.some((reply) => reply.id === id)))

        if (followerToUpdate) {
            const commentToUpdate = followerToUpdate?.comments?.find((comment) =>
                comment?.replies?.some((reply) => reply.id === id)
            );

            const updatedReplies = commentToUpdate?.replies?.filter((reply) => reply.id !== id);

            const updatedComment = { ...commentToUpdate, replies: updatedReplies };

            const updatedFollower = {
                ...followerToUpdate,
                comments: followerToUpdate?.comments?.map((comment) =>
                    comment === commentToUpdate ? updatedComment : comment),
            }

            const updatedFollowing = user?.following?.map((follower) =>
                follower === followerToUpdate ? updatedFollower : follower);

            setUser({ ...user, following: updatedFollowing });

        }

        //Update state on target user profile
        const updatedComments = targetUser?.comments?.map((comment) => {
            if (comment.id === comment_id) {
                const updatedReplies = comment?.replies?.filter((reply) => reply.id !== id);
                return { ...comment, replies: updatedReplies };
            } else {
                return comment;
            }
          });
          
          const updatedTargetUser = { ...targetUser, comments: updatedComments };
          setTargetUser(updatedTargetUser);

    }


    useEffect(() => {
        if (user && user.id === user_id) {
          setShowDelete(true)
        } else {
          setShowDelete(false)
        }
      }, [user, user_id])

    return(
        <div className="bg-zinc-900 border border-lime-200 shadow  p-2 my-6 my-1 ">
                <div className="grid grid-cols-2">
                    <div className="text-left col-span-1">
                        <h2 className="text-lg font-bold tracking-tight text-lime-100">{username}</h2> 
                        <h2 className="text-lime-100">{reply} </h2>
                    </div>
                    <div className="">
                        {showDelete ? <button onClick={handleDeleteReply} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mb-4 shadow font-bold px-2">Delete</button> : null }
                    </div>
                </div>
        </div>
    )
}

export default ReplyCard