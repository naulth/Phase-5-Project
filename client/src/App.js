import React, {useState, useEffect} from "react"
import {Routes, Route, useNavigate} from "react-router-dom"

import Signup from "./Components/Signup"
import Login from "./Components/Login"
import Nav from "./Components/Nav"
import Games from "./Components/Games"
import Profile from "./Components/Profile"
import GamePage from "./Components/GamePage"
import Users from "./Components/Users"


import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import EditUserForm from "./Components/EditUserForm"
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

    function handleUpdate(user) {
        setUser(user)
    }

    function handleLogin(user) {
        setUser(user);
    }

    function handleLogout() {
        
        fetch("/logout", {
            method: "DELETE",
        }).then(
            // () => onLogout()
            setUser(null)
            
        );
        console.log('logged out')
    }

    const [gamesArray, setGamesArray] = useState([])

    useEffect(() => {
        fetch('/games')
            .then(r => r.json())
            .then(setGamesArray)
    },[])

    const [commentsArray, setCommentsArray] = useState([])

    useEffect(() => {
        fetch('/comments')
            .then(r => r.json())
            .then(setCommentsArray)
    },[])

    const [usersArray, setUsersArray] = useState([])

    useEffect(() => {
        fetch('/users')
            .then(r => r.json())
            .then(setUsersArray)
    },[])

    const handleDeleteComment = (deadCommentId) => {
        setCommentsArray(commentsArray.filter(comment => comment.id !== deadCommentId))
    }

    const addComment = (newCommentObj) => {
        setCommentsArray([...commentsArray, newCommentObj])
    }

    const editComment = (commentObj) => {
        const updatedComments = [...commentsArray].map(comment => comment.id === commentObj.id ? commentObj : comment)
        setCommentsArray(updatedComments)
    }

    return (
        <div className="">
            <Nav user={user} handleLogout={handleLogout}/>
            <Routes>
                <Route path="/users" element={<Users usersArray={usersArray} user={user}/>} />
                <Route path='games' element={<Games gamesArray={gamesArray} user={user} commentsArray={commentsArray}/>}/>
                <Route path='games/:gameId' element={<GamePage addComment={addComment} handleUpdate={handleUpdate} user={user} commentsArray={commentsArray}/>} />
                <Route path='profile' element={<Profile user={user} setUser={setUser} editComment={editComment} handleDeleteComment={handleDeleteComment} commentsArray={commentsArray} handleLogout={handleLogout} handleUpdate={handleUpdate}/> } />
                {/* <Route path='edit' element={<EditUserForm user={user} setUser={setUser} handleUpdate={handleUpdate}/>} /> */}
                <Route path="signup" element={<Signup />} />
                <Route path="/" element={<Login handleLogout={handleLogout} handleLogin={handleLogin} user={user}/>} />
            </Routes>
        </div>
    );
}

export default App;
