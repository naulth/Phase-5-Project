import React, {useState} from "react"

function Signup(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

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
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={createNewUser}>
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
                <label>Confirm Password</label>
                <input
                    type="text"
                    name="confirm"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                />
                <input
                    type="submit"
                    name="submit"
                />
            </form>
        </div>
    )
}

export default Signup