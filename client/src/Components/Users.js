import { useEffect, useContext} from "react"
import UserCard from "./UserCard"
import {UserContext} from "../Context/user"
import { UsersArrayContext } from "../Context/usersArray"

function Users(){

    const {user} = useContext(UserContext)
    const{usersArray, setUsersArray} = useContext(UsersArrayContext)

    useEffect(() => {
        fetch('/users')
        .then((res) => {
            if (res.ok) {
                res.json().then((r) => {
                    setUsersArray(r)
                })
            }
        })
    },[])


    const filteredUserArray = [...usersArray]?.filter(userObj => userObj?.id !== user?.id)

    const userComponents = filteredUserArray?.map(userObj => <UserCard key={userObj.id} id={userObj.id} username={userObj.username} image={userObj.image} />)

    

    return(
        <div>
        <h1 className="text-5xl text-center font-bold tracking-tight text-slate-900 py-6">Users</h1>
        {userComponents}
        </div>
    )
}

export default Users