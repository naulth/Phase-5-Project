import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

function Login({user, handleLogout, handleLogin}){

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [log, setLog] = useState(false)

    const toggleModal = () => {
        setIsOpen(!isOpen);
      };

    const toggleLogButton = () => {
        setLog(!log)
    }

    function handleLoginSubmit(e) {
        e.preventDefault()

        fetch("http://localhost:5555/login", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({username, password})
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => handleLogin(user))
                toggleLogButton()
            } else {
                toggleModal()
            }
        })
    }


    return(
        <>
        <form onSubmit={handleLoginSubmit}>
            <h2>Login</h2>
            <h2>Welcome, {user && user.username}</h2>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="text"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="submit"
                    name="submit"
                />
            </div>
        </form>
        {isOpen && (
            <div>
                <div>
                    <h2>Stop Right There!!!</h2>
                    <p>You are an impostor and clearly not a lil stinker.</p>
                    <button onClick={toggleModal}>Try Again</button>
                </div>
            </div>
        )}
        {log && (
            <button onClick={handleLogout}>Log Out</button>
        )}
        </>
    )
}

export default Login