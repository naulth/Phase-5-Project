import React, {useState, useEffect} from 'react'
import UserCommentCard from './UserCommentCard'
import {useNavigate, Link} from "react-router-dom"
import EditUserForm from "./EditUserForm"

function Profile({user, setUser, handleUpdate, commentsArray, handleDeleteComment, editComment, handleLogout}){

    const navigate = useNavigate()

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


    const userCommentArray = commentsArray?.filter(comment => comment?.user_id == user?.id)
 
    const byCreate = (commentA, commentB) => {
        return commentB.created_at - commentA.created_at
    }

    const sortedComponents = [...userCommentArray].sort(byCreate).reverse()

    const userComments = sortedComponents?.map(comment => <UserCommentCard key={comment?.id} commentId={comment?.id} gamename={comment?.game_name} score={comment?.score} content={comment?.content} handleDeleteComment={handleDeleteComment} user={user} editComment={editComment} />)

   // const editCommentToUser = (changedComment) => {
    //     const changedUserComments = [...userCommentsArray]
    //     changedUserComments.map(comment => comment.id === changedComment.id ? changedComment : comment)
    //     setUserCommentsArray(changedUserComments)
    // }

    return(
        <div className="bg-zinc-800 h-screen">
		<div className="justify-items-center grid w-full grid-cols-6 gap-x-2 gap-y-4 ">
            <div className="fixed left-0 w-72 px-8 h-full lg:px-8 border border-lime-200 bg-zinc-900">
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
            <div className="col-span-2"></div>
            <div className="col-span-2 ml-30 content-center">
            <div className=" bg-sky-950 rounded-2xl border shadow px-8 w-108 h-fit">
                <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200"> Recent Comments </h1>
                <div className="">
                    {userComments}
                </div>
            </div>
            </div>
            <div className="col-span-1"></div>
            

            {/* <div className="">
                <h1> Favorite Games </h1>
            </div> */}
		</div>
        </div>
	)
}

export default Profile