import {useState, useContext} from 'react'
import {UserContext} from "../Context/user"
import {useNavigate} from "react-router-dom"


function DeleteProfile({deleteUser, handleLogout}){

    const [showDelete, setShowDelete] = useState(false)
    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate()

    const handleShowDelete = () => {
        setShowDelete(!showDelete)
    }

    const handleDelete = (e) => {
        fetch(`/users/${user.id}`,{
        method: 'DELETE'
        })
        handleLogout()
        deleteUser(user.id)
        navigate('/')
    }


    return(
        <div>
            <button onClick={handleShowDelete} className="hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-4 my-1 mx-2">Delete Profile</button>
            {showDelete &&
                <div className="fixed top-0 left-0 w-full h-full bg-zinc-800 bg-opacity-50 flex justify-center items-center">
                    <div className="max-w-2xl py-20 mx-auto shadow-lg p-8 my-16 bg-zinc-800 border border-lime-100">
                        <div>
                            <h2 className="text-3xl py-4 px-4 font-bold tracking-tight text-lime-200">Are You Sure You Want To Delete Your Profile?</h2>
                        </div>
                         <div className="text-center mt-6 ">
                         <button onClick={handleShowDelete} className="text-center hover:bg-zinc-700 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold p-2 mx-4 ">Nevermind</button>
                         <button onClick={handleDelete} className="hover:bg-zinc-700 hover:text-red-400 text-sm w-36 text-red-300 border border-red-600 shadow font-bold p-2 mx-4">Delete Account</button>
                        </div>
                    </div>
                    
                </div>
            }
        </div>
    )
}
export default DeleteProfile