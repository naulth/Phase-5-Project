import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link, useNavigate} from 'react-router-dom'

function EditUserForm({handleUpdate, user, setUser}){

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [profileImage, setProfileImage] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirm, setConfirm] = useState('')
    // const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    // const handleShow = () => {
    //     setShowPassword(!showPassword)
    // }

    const handleEdit = (e) => {
        e.preventDefault()
        fetch(`/users/${user.id}` , {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                username: username,
                image: profileImage,
                // _password_hash: password,
                // confirm_password: confirm
            }),
        }).then((r) => {
            if (r.ok) {
              r.json().then((user) => {
                setUser(user)
            });
            }
        })
        setUsername('')
        setFirstName('')
        setLastName('')
        // setPassword('')
        // setConfirm('')
        setProfileImage('')

        handleUpdate();
        navigate('/profile')

    }

    return(
        <div className="max-w-2xl py-20 mx-auto rounded-2xl shadow-lg p-8 my-16 bg-gray-800">
                <h2 className="text-3xl pt-4 font-bold tracking-tight text-white">Edit Your Information</h2>
                <form className="space-y-6" onSubmit={handleEdit}>
                <div className="mt-10 grid grid-cols-4 gap-x-6 gap-y-10">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-white">Username</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-white">First Name</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-white">Last Name</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-white">Profile Image URL</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="profileImage"
                                value={profileImage}
                                onChange={(e) => setProfileImage(e.target.value)}
                                className="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <button className="flex w-full justify-center rounded-md bg-sky-950 px-3 py-1.5 text-sm  leading-6 text-sky-950 bg-lime-100 font-bold shadow-sm hover:bg-lime-200 hover:text-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200" type="submit">Submit</button>

                    {/* <Link to="/profile">Submit</Link> */}

                    {/* <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2 relative w-full">
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
                                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="confirm"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div> */}
                    {/* <input
                        type="submit"
                        name="submit"
                        className="flex w-full justify-center rounded-md bg-sky-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-200 hover:text-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"
                    /> */}
                    
                    </div>
                </form>
            </div>
    )
}

export default EditUserForm