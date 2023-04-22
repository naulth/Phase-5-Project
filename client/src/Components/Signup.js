import React, {useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Signup(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleShow = () => {
        setShowPassword(!showPassword)
    }

    const createNewUser = (e) => {
        e.preventDefault()

        const newUser = {
            username: username, 
            password: password, 
            confirm_password: confirm
        }
        console.log(newUser)

        fetch('http://localhost:5555/signup', {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newUser)
        })
    }

    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <img className="mx-auto h-10 w-auto" src="" alt="Logo"/>*/}
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-sky-950">Create a new account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={createNewUser}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="z-0 relative w-full">
                            <div className="absolute inset-y-4 right-0 flex items-center px-2">
                                <input className="hidden js-password-toggle" id="toggle" type="checkbox" />
                                <span className="z-auto ">
                                    {showPassword ? <FontAwesomeIcon icon="fa-solid fa-eye" onClick={handleShow}/> :  <FontAwesomeIcon icon="fa-solid fa-eye-slash" onClick={handleShow}/>
                                    }
                                </span>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="confirm"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <input
                        type="submit"
                        name="submit"
                        className="flex w-full justify-center rounded-md bg-sky-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-200 hover:text-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
                    />
                </form>
            </div>
        </div>
    )
}

export default Signup