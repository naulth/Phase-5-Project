import { useEffect} from "react"
import UserCard from "./UserCard"

function Users({user, setUser, usersArray}){

    useEffect(() => {
        fetch("/check_session").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            } else {
                console.log(response.status)
                response.text().then(console.warn)
            }
        });
    }, []);

    const theUsersId = user?.id

    const filteredUserArray = usersArray?.filter(userObj => userObj?.id !== theUsersId)

    const userComponents = filteredUserArray?.map(userObj => <UserCard key={userObj.id} username={userObj.username} image={userObj.image} />)

    

    return(
        <div>
        <h1 className="text-5xl text-center font-bold tracking-tight text-slate-900 py-6">Users</h1>
        {userComponents}
        </div>
    )
}

export default Users