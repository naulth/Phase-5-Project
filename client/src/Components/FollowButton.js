import React, {useState, useContext, useEffect, useCallback} from 'react'
import { UserContext } from '../Context/user'

function FollowButton({targetId}) {

    const [isFollowing, setIsFollowing] = useState(false)
    const {user, setUser} = useContext(UserContext)


    useEffect(()=>{
        fetch(`/check/${targetId}`)
        .then((res) => {
            if (res.ok) {
                res.json().then((r) => {
                    setIsFollowing(r.isFollowing)
                })
            }
        })
    },[targetId, user])



    const follow = () => {

        console.log(targetId)
        fetch(`/follow/${targetId}`, {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({followed_id: targetId})
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


    const unfollow = () => {
        
        fetch(`/unfollow/${targetId}`, {
            method: "DELETE"
        }).then((response) => {
            if (response.ok) {
                const newUser = {
                    ...user,
                    following: [
                        ...user?.following?.filter(follower => follower.id !== targetId)
                    ]
                } 
                setUser(newUser)
                
            
            }
        })
    }



    return(
        <div>
        { isFollowing ? <button onClick={unfollow} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border border-lime-100 shadow font-bold px-4 rounded mx-2 mb-2">Unfollow</button> : <button  onClick={follow} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border border-lime-100 shadow font-bold px-4 rounded mx-2 mb-2">Follow</button>}
            
        </div>
    )
}



export default FollowButton