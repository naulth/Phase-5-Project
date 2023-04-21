import React, {useState, useEffect} from "react"
import {Routes, Route} from "react-router-dom"

import Home from "./Components/Home"
import Signup from "./Components/Signup"
import Login from "./Components/Login"

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
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login handleLogout={handleLogout} handleLogin={handleLogin} user={user}/>} />
        </Routes>
    );
}

export default App;
