import React, {useState} from 'react'
import UserCommentCard from './UserCommentCard'
import {useNavigate, Link} from "react-router-dom"
import EditUserForm from "./EditUserForm"

function Profile({user, setUser, handleUpdate, handleLogout}){

    const navigate = useNavigate()

    const handleDelete = (e) => {
        fetch(`/users/${user.id}`,{
        method: 'DELETE'
        })
        handleLogout()
        navigate('/login')
    }

    const [editForm, setEditForm] = useState(false)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    };

    const formattedDate = formatDate(user?.birth_date)

    const userComments = user?.comments?.map(comment => <UserCommentCard key={user.id} gamename={comment.game_name} score={comment.score} content={comment.content}/>)

    return(
        <div className="h-screen bg-slate-400">
            <div>
                {editForm ?  <EditUserForm user={user} setUSer={setUser} handleUpdate={handleUpdate}/> : null }
            </div>
		<div className="py-24 px-24 sm:py-32 justify-items-center grid max-w-8xl grid-cols-3 gap-x-2 gap-y-4 ">
            <div className="mx-auto w-72 px-8 max-h-1/2 mx-10 lg:px-8 border rounded-2xl bg-sky-950 shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200">{user && user.username}</h1>
                </div>
                <div className="">
                    <img className="w-full rounded-2xl mx-auto" src={user && user.image}/>
                </div>
                <div className="py-4 px-4 text-center">
                    <p className="text-lg font-bold tracking-tight text-white">{user && user.first_name} {user && user.last_name}</p>
                    <p className="text-lg font-bold tracking-tight text-white">Birthday: {formattedDate}</p>
                    <div className="">
                    <button className="hover:bg-sky-950 hover:text-lime-200 text-sm text-lime-200 border border-lime-200 shadow font-bold py-1 px-4 rounded my-6 mx-2 w-36 "><Link to="/edit">Edit Account</Link></button>
                    <button onClick={handleDelete} className="hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-4 rounded my-1 mx-2">Delete Account</button>
                    </div>
                </div>
            </div>
            <div className="col-span-2 bg-sky-950 rounded-2xl border shadow p-4 my-4 max-w-lg">
                <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200"> Recent Comments </h1>
                <div>
                    {userComments}
                </div>
            </div>
            {/* <div className="">
                <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-gray-900"> Edit Profile </h1>
                
            </div> */}
            

            {/* <div className="">
                <h1> Favorite Games </h1>
            </div> */}
		</div>
        </div>
	)
}

export default Profile