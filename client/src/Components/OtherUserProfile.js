
import {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UsersArrayContext } from "../Context/usersArray"
import TargetCommentCard from './TargetCommentCard'
import { FavoritesContext } from '../Context/favorites'
import { CommentsContext } from '../Context/comments'
import EmptyComment from './EmptyComment'
import TargetFavoriteCard from './TargetFavoriteCard'
import EmptyFavorite from './EmptyFavorite'
import { FollowersContext } from '../Context/followers'

function OtherUserProfile() {

    const{user, usersArray} = useContext(UsersArrayContext)
    const {favoritesArray} = useContext(FavoritesContext)
    const {commentsArray} = useContext(CommentsContext)
    const {followersArray, setFollowersArray} = useContext(FollowersContext)

    const params = useParams()

    const id = params.userId

    console.log(id)

    const targetUser = usersArray.find(user => user.id == id)




    const targetCommentArray = [...commentsArray].filter(comment => comment?.user_id == targetUser?.id)

    const byCreate = (commentA, commentB) => {
        return commentB?.created_at - commentA?.created_at

    }

    const sortedComponents = [...targetCommentArray].sort(byCreate).reverse()

    const targetComments = sortedComponents?.map(comment => <TargetCommentCard key={comment?.id} commentId={comment?.id} gamename={comment?.game_name} score={comment?.score} content={comment?.content} game_id={comment?.game_id}/>)


    const targetFavoriteArray = [...favoritesArray].filter(favorite => favorite?.user_id == targetUser?.id)

    const targetFavorites = targetFavoriteArray?.map(favorite => <TargetFavoriteCard key={favorite.id} id={favorite.id} title={favorite?.game_title} image={favorite?.game_image}/>)

    const createFollow = (e) => {

        const newFollow = {
            followed_id: targetUser?.id,
            follower_id: user?.id,
        }

        fetch('/followers', {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newFollow)
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((response) => console.log(response))
            }
        })

    }

    // setFollowersArray([...followersArray, (response)])


    return(
        <div className="bg-zinc-800 min-h-screen h-full">
		<div className="grid w-full grid-cols-6 gap-6 h-full">

            <div className="float-left w-72 px-8 h-screen col-span-1  border border-lime-200 bg-zinc-900">
                <div className="text-center py-10 ">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200">{targetUser?.username}</h1>
                </div>
                <div className="pb-10">
                    <img className="w-full rounded-2xl mx-auto" src={targetUser?.image}/>
                </div>
                <div className="pb-4 px-4 text-center">
                    <p className="text-lg py-4 font-bold tracking-tight text-white">{targetUser?.first_name} {targetUser?.last_name}</p>
                    <button onClick={createFollow} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border border-lime-100 shadow font-bold px-4 rounded mx-2 mb-2">Add Friend</button>
                </div>
                
            </div>

            <div className="col-span-1 ">
                <div className=" bg-zinc-900 text-center border border-lime-100 shadow px-8 h-fit">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200"> Recent Comments </h1>
                    <div className="w-full ">
                        {targetComments?.length ? targetComments : <EmptyComment />}
                    </div>
                </div>
            </div>

            <div className="col-span-2 float-left h-fit">
                <div className=" bg-zinc-900 text-center border border-lime-100 shadow px-8">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200"> Favorite Games </h1>
                    <div className="grid grid-cols-2 gap-x-8 pb-6">
                        {targetFavorites.length ? targetFavorites : <EmptyFavorite />}
                    </div>
                </div>
            </div>
		</div>
        </div>
	)
}

export default OtherUserProfile