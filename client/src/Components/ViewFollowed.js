import {useState, useContext, useEffect} from 'react'
import {UserContext} from "../Context/user"
import UserCard from './UserCard'
import { UserFollowsContext } from '../Context/userfollows'

function ViewFollowed(){

    const [showFollowed, setShowFollowed] = useState(false)
    const {user} = useContext(UserContext)
    const {userFollows, setUserFollows} = useContext(UserFollowsContext)

    const toggleFollowed = () => {
        setShowFollowed(!showFollowed)
    }

    useEffect(() => {
        setUserFollows(user?.following?.map(follow => (
          <UserCard key={follow?.id} image={follow?.image} username={follow?.username} id={follow?.id} />
        )));
      }, [user, user?.following, setUserFollows]);
      

    return(
        <div>
            <button className="hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-4 my-1 mx-2" onClick={toggleFollowed}>Followed Users</button>
            {showFollowed &&
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800 bg-opacity-50 flex justify-center items-center">
                <div className=" bg-zinc-900 text-center border border-lime-100 shadow py-10 px-8 h-fit w-1/2">
                    <h1 className="text-3xl pb-8 px-4 font-bold tracking-tight text-lime-200"> Users You Follow </h1>
                    <div className="grid grid-cols-4 gap-6 p-6">
                        {userFollows}
                    </div>
                    <button className=" border border-lime-300 flex w-48 justify-center rounded-md bg-zinc-800 px-3 py-1.5 mt-6 text-sm leading-6 text-lime-100  font-bold shadow-sm hover:bg-zinc-800 hover:text-lime-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200" onClick={toggleFollowed}>Close</button>
                </div>        
            </div>
            }
        </div>
    )
}

export default ViewFollowed