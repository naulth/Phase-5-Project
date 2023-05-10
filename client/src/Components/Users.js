import { useEffect, useContext, useState} from "react"
import UserCard from "./UserCard"
import {UserContext} from "../Context/user"
import { UsersArrayContext } from "../Context/usersArray"
import logo from "../Images/power_symbol.jpg"

function Users(){

    const {user} = useContext(UserContext)
    const{usersArray, setUsersArray} = useContext(UsersArrayContext)
    const [loggedIn, setLoggedIn] = useState([])

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

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/checkloggedin')
            .then((res) => {
                if (res.ok) {
                    res.json().then((r) => {
                        setLoggedIn(r)
                        console.log(loggedIn)
                    })
                }
            })
        }, 30000)
        return () => clearInterval(interval)
    }, [])


    const filteredUserArray = [...usersArray]?.filter(userObj => userObj?.id !== user?.id)

    const userComponents = filteredUserArray?.map(userObj => {

        const isLoggedIn = loggedIn.some(loggedInUser => loggedInUser.id === userObj.id)
        const online = isLoggedIn ? logo : null;

        return <UserCard key={userObj.id} id={userObj.id} username={userObj.username} online={online} image={userObj.image} />})

    

    return(
        <div className="HomeImg">
            <div className="mx-auto border border-lime-100 bg-zinc-900 w-full p-8">
                <h1 className="text-5xl text-center font-bold tracking-tight text-lime-200 py-6">Users</h1>
            </div>
            <div className="w-full mx-auto">
                <div className="grid grid-cols-5 justify-items-center py-10">
                    {userComponents}
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Users