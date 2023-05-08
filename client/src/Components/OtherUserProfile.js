
import {useContext, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { UsersArrayContext } from "../Context/usersArray"
import TargetCommentCard from './TargetCommentCard'
import { FavoritesContext } from '../Context/favorites'
import { CommentsContext } from '../Context/comments'
import { UserContext } from '../Context/user'
import EmptyComment from './EmptyComment'
import TargetFavoriteCard from './TargetFavoriteCard'
import EmptyFavorite from './EmptyFavorite'
import FollowButton from './FollowButton'

function OtherUserProfile() {

    const{usersArray} = useContext(UsersArrayContext)
    const {favoritesArray} = useContext(FavoritesContext)
    const {commentsArray} = useContext(CommentsContext)
    const {user, setUser} = useContext(UserContext)

    const [targetUser, setTargetUser] = useState({})

    const params = useParams()

    const id = params.userId

    useEffect(() => {
        fetch(`/users/${id}`)
        .then((res) => {
            if (res.ok) {
                res.json().then((r) => {
                    setTargetUser(r)
                })
            } else {
                console.log('target not fetched ok')
            }
        })
    },[])

    // const [ friend, setFriend] = useState(false)

    // const toggleFriend = () => {
    //     setFriend(!friend)
    // }



    const byCreate = (commentA, commentB) => {
        return commentB?.created_at - commentA?.created_at

    }

    const sortedComponents = targetUser?.comments?.slice().sort(byCreate).reverse()

    const targetComments = sortedComponents?.map(comment => <TargetCommentCard key={comment?.id} commentId={comment?.id} gamename={comment?.game_name} score={comment?.score} content={comment?.content} game_id={comment?.game_id}/>)


    const targetFavorites = targetUser?.favorites?.map(favorite => <TargetFavoriteCard key={favorite.id} id={favorite.id} title={favorite?.game_title} image={favorite?.game_image}/>)

    const createFriend = () => {

        fetch(`/follow/${targetUser?.id}`, {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({followed_id: targetUser?.id})
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((response) => {
                    const newUser = {
                    ...user,
                    following: [
                        ...user?.following, response 
                    ]
                    }
                    setUser(newUser)
                })
            }
        })
    }

    const deleteFriend = () => {

        fetch(`/unfollow/${targetUser.id}`, {
            method: "DELETE"
        })

        const newUser = {
            ...user,
            following: [
                ...user?.following?.filter(follower => follower.id !== targetUser.id)
            ]
        }    
        setUser(newUser)
    }


    return(
        <div className="bg-zinc-800 min-h-screen h-full">
		<div className="grid w-full grid-cols-6 gap-6 h-full">

            <div className="float-left w-72 px-8 col-span-1 h-screen border border-lime-200 bg-zinc-900">
                <div className="text-center py-10 ">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200">{targetUser?.username}</h1>
                </div>
                <div className="pb-10">
                    <img className="w-full rounded-2xl mx-auto" src={targetUser?.image}/>
                </div>
                <div className="pb-4 px-4 text-center">
                    <p className="text-lg py-4 font-bold tracking-tight text-white">{targetUser?.first_name} {targetUser?.last_name}</p>
                    <FollowButton targetId={id} />
                </div>
                
            </div>

            <div className="col-span-2 float-left h-fit">
                <div className=" bg-zinc-900 text-center border border-lime-100 shadow px-8">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200"> Favorite Games </h1>
                    <div className="grid grid-cols-2 gap-x-8 pb-6">
                        {targetFavorites?.length ? targetFavorites : <EmptyFavorite />}
                    </div>
                </div>
            </div>

            <div className="col-span-2 ">
                <div className=" bg-zinc-900 text-center border border-lime-100 shadow px-8 h-fit">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200"> Recent Comments </h1>
                    <div className="w-full ">
                        {targetComments?.length ? targetComments : <EmptyComment />}
                    </div>
                </div>
            </div>

            
		</div>
        </div>
	)
}

export default OtherUserProfile