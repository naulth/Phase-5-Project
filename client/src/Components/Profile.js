import React from 'react'
import UserCommentCard from './UserCommentCard'

function Profile({user}){

    const userComments = user?.comments?.map(comment => <UserCommentCard key={user.id} gamename={comment.game_name} score={comment.score} content={comment.content}/>)

    return(
		<div className="py-24 sm:py-32 justify-items-center grid max-w-8xl grid-cols-4 gap-x-2 gap-y-4 ">
            <div className="mx-auto max-w-3xl px-8 mx-10 lg:px-8 border rounded shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl py-4 px-4 font-bold tracking-tight text-gray-900">{user && user.username}</h1>
                </div>
                <div className="">
                    {/* <img className="w-1/3 rounded-2xl mx-auto" src={user && user.image}/> */}
                </div>
                <div className="py-4 px-4 text-center">
                    <p className="text-lg font-bold tracking-tight text-gray-900">Name: {user && user.first_name} {user && user.last_name}</p>
                    <p className="text-lg font-bold tracking-tight text-gray-900">Birthday: {user && user.birth_date}</p>

                </div>
            </div>
            <div className="col-span-2">
                <h1> Comments </h1>
                <div>
                    {userComments}
                </div>
            </div>
            

            <div className="">
                <h1> Favorite Games </h1>
            </div>
		</div>
	)
}

export default Profile