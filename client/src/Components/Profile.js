import React, {useState, useEffect, useContext} from 'react'
import UserCommentCard from './UserCommentCard'
import {useNavigate, Link} from "react-router-dom"
import EditUserForm from "./EditUserForm"
import FavoriteCard from './FavoriteCard'
import EmptyComment from './EmptyComment'
import EmptyFavorite from './EmptyFavorite'
import {UserContext} from "../Context/user"

function Profile({handleUpdate, commentsArray, setCommentsArray, handleDeleteComment, editComment, handleLogout, favoritesArray, deleteFavorite}){

    const navigate = useNavigate()

    const {user, setUser} = useContext(UserContext)

    // useEffect(() => {
    //     fetch("/check_session").then((response) => {
    //         if (response.ok) {
    //             response.json().then((user) => setUser(user));
    //         } else {
    //             console.log(response.status)
    //             response.text().then(console.warn)
    //         }
    //     });
    // }, []);

    useEffect(() => {
        Promise.all([
            fetch('/check_session'),
            fetch('/comments'),
        ])
        .then(([resSession, resComments]) =>
            Promise.all([resSession.json(), resComments.json()])
        )
        .then(([dataSession, dataComments]) => {
            setUser(dataSession)
            setCommentsArray(dataComments)
        })
    }, [])


    const handleDelete = (e) => {
        fetch(`/users/${user.id}`,{
        method: 'DELETE'
        })
        handleLogout()
        navigate('/login')
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    };

    const formattedDate = formatDate(user?.birth_date)

    // console.log(commentsArray)
/////////////////////////////////////////////////////////////

    let userComments = []
    if(commentsArray?.length > 0) {
        const userCommentArray = [...commentsArray].filter(comment => comment?.user_id == user?.id)

        const byCreate = (commentA, commentB) => {
            return commentB?.created_at - commentA?.created_at
    
        }
    // console.log(userCommentArray)

    const sortedComponents = [...userCommentArray].sort(byCreate).reverse()

    // console.log(sortedComponents)

    const userComments = sortedComponents?.map(comment => <UserCommentCard key={comment?.id} commentId={comment?.id} gamename={comment?.game_name} score={comment?.score} content={comment?.content} game_id={comment?.game_id} handleDeleteComment={handleDeleteComment} user={user} editComment={editComment} />)
    }

    ////////////////////////////////////////////////////

    // console.log(userComments)


    let userFavorites = null
    if(favoritesArray?.length > 0) {
        const userFavoriteArray  = favoritesArray?.filter(favorite => favorite?.user_id == user?.id)

        userFavorites = userFavoriteArray?.map(favorite => <FavoriteCard deleteFavorite={deleteFavorite} key={favorite.id} id={favorite.id} title={favorite?.game_title} image={favorite?.game_image}/>)
    }

    return(
        <div className="bg-zinc-800 min-h-screen h-full">
		<div className="grid w-full grid-cols-6 gap-x-2 gap-y-4 ">
            <div className="float-left w-72 px-8 min-h-screen col-span-1  border border-lime-200 bg-zinc-900">
                <div className="text-center py-10 ">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200">{user && user.username}</h1>
                </div>
                <div className="pb-10">
                    <img className="w-full rounded-2xl mx-auto" src={user && user.image}/>
                </div>
                <div className="pb-4 px-4 text-center">
                    <p className="text-lg py-4 font-bold tracking-tight text-white">{user && user.first_name} {user && user.last_name}</p>
                    <p className="text-lg py-4 font-bold tracking-tight text-white">Birthday: {formattedDate}</p>
                    <div className="pt-10">
                    <EditUserForm user={user} handleUpdate={handleUpdate} setUser={setUser}/>
                    <button onClick={handleDelete} className="hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-4 rounded my-10 mx-2">Delete Account</button>
                    </div>
                </div>
            </div>
            <div className="col-span-5 min-w-screen ml-1">
                <div className="grid grid-cols-4">
                    <div className="col-span-1">
                    <div className=" bg-zinc-900 text-center border border-lime-100 shadow px-8 h-fit">
                        <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200"> Recent Comments </h1>
                        <div className="w-full ">
                            {userComments.length ? userComments : <EmptyComment />}
                        </div>
                    </div>
                    </div>
                    <div className=" bg-zinc-900 col-span-2 text-center border border-lime-100 shadow px-8 h-fit">
                        <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200"> Favorite Games </h1>
                        <div className="">
                            {userFavorites}
                        </div>
                    </div>
                </div>
            </div>
		</div>
        </div>
	)
}

export default Profile