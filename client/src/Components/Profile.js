import React, {useState, useEffect, useContext} from 'react'
import UserCommentCard from './UserCommentCard'
import {useNavigate, Link} from "react-router-dom"
import EditUserForm from "./EditUserForm"
import FavoriteCard from './FavoriteCard'
import EmptyComment from './EmptyComment'
import EmptyFavorite from './EmptyFavorite'
import CommentCard from './CommentCard'
import UserCard from './UserCard'
import ViewFollowed from './ViewFollowed'
import {UserContext} from "../Context/user"

function Profile({handleUpdate, deleteUser, handleDeleteComment, editComment, handleLogout, deleteFavorite}){

    const navigate = useNavigate()

    const {user, setUser} = useContext(UserContext)

    const handleDelete = (e) => {
        fetch(`/users/${user.id}`,{
        method: 'DELETE'
        })
        handleLogout()
        deleteUser(user.id)
        navigate('/')
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    };

    const formattedDate = formatDate(user?.birth_date)


    const byCreate = (commentA, commentB) => {
        return commentB?.created_at - commentA?.created_at

    }

    const sortedComponents = user?.comments?.slice().sort(byCreate).reverse()

    const userComments = sortedComponents?.map(comment => <UserCommentCard key={comment?.id} commentId={comment?.id} gamename={comment?.game_name} gameImage ={comment?.game_image} score={comment?.score} content={comment?.content} game_id={comment?.game_id} handleDeleteComment={handleDeleteComment} user={user} editComment={editComment} />)
   

    // user?.following.map(user => console.log(user.comments.map(comment => console.log(comment))))
    // const followedUserComments = user?.following?.map(user => user.comments.map(commentObj => <CommentCard content={commentObj.content} />))
    // console.log(followedUserComments)

    const userFavorites = user?.favorites?.map(favorite => <FavoriteCard deleteFavorite={deleteFavorite} key={favorite.id} id={favorite.id} title={favorite?.game_title} image={favorite?.game_image}/>)

    return(
        <div className="bg-zinc-800 min-h-screen h-full">
		<div className="grid w-full grid-cols-6 gap-6 h-full">

            <div className="float-left px-8 h-screen col-span-1 border border-lime-200 bg-zinc-900">
                <div className="text-center py-10 ">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200">{user && user.username}</h1>
                </div>
                <div className="pb-10">
                    <img className="w-full rounded-2xl border border-lime-100 mx-auto" src={user && user.image} alt={user?.username}/>
                </div>
                <div className="pb-4 px-4 text-center">
                    <p className="text-lg py-4 font-bold tracking-tight text-white">{user && user.first_name} {user && user.last_name}</p>
                    <p className="text-lg py-4 font-bold tracking-tight text-white">Birthday: {formattedDate}</p>
                    <div className="pt-10">
                    <EditUserForm user={user} handleUpdate={handleUpdate} setUser={setUser}/>
                    <button onClick={handleDelete} className="hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-4 rounded my-10 mx-2">Delete Account</button>
                    </div>
                    <ViewFollowed />
                </div>
            </div>

            <div className="col-span-1 ">
                <div className=" bg-zinc-900 text-center border border-lime-100 shadow py-10 px-8 h-fit">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200"> Your Recent Comments </h1>
                    <div className="w-full ">
                        {userComments?.length ? userComments : <EmptyComment />}
                    </div>
                </div>
            </div>
            <div>

            </div>
            <div className="col-span-2 float-left h-fit">
                <div className=" bg-zinc-900 text-center border border-lime-100 shadow px-8">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200"> Favorite Games </h1>
                    <div className="grid grid-cols-2 gap-x-8 pb-6">
                        {userFavorites?.length ? userFavorites : <EmptyFavorite />}
                    </div>
                </div>
            </div>
		</div>
        </div>
	)
}

export default Profile