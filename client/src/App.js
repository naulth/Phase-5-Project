import React, {useState, useEffect} from "react"
import {Routes, Route} from "react-router-dom"

import Home from "./Components/Home"
import Signup from "./Components/Signup"
import Login from "./Components/Login"
import Nav from "./Components/Nav"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
library.add(faEye,faEyeSlash)

function App() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch("/check_session").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            }
        });
    }, []);

    function handleLogin(user) {
        setUser(user);
    }

    function handleLogout() {
        
        fetch("http://localhost:5555/logout", {
            method: "DELETE",
        }).then(
            // () => onLogout()
            setUser(null)
        );
        console.log('logged out')
    }

    return (
        <div>
            <Nav user={user} handleLogout={handleLogout}/>
            <Routes>
                <Route path="/" element={<Home user={user}/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login handleLogout={handleLogout} handleLogin={handleLogin} user={user}/>} />
            </Routes>
        </div>
    );
}

export default App;
