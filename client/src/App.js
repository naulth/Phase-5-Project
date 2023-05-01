import React, {useState, useEffect, useContext} from "react"
import {Routes, Route, useNavigate} from "react-router-dom"

import Signup from "./Components/Signup"
import Login from "./Components/Login"
import Nav from "./Components/Nav"
import Games from "./Components/Games"
import Profile from "./Components/Profile"
import GamePage from "./Components/GamePage"
import Users from "./Components/Users"

import {UserProvider} from "./Context/user"
import {UserContext} from "./Context/user"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import EditUserForm from "./Components/EditUserForm"
library.add(faEye,faEyeSlash)



function App() {

    // const [user, setUser] = useState(null)

    // useEffect(() => {
    //     fetch("/check_session").then((response) => {
    //         if (response.ok) {
    //             response.json().then((user) => setUser(user));
    //         } else {
    //             console.log(response.status)
    //             response.text().then(console.warn)
    //         }
    //     });
    // }, []);

    const {user, setUser} = useContext(UserContext)

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

    const addComment = (values) => {

        const newCommentObj = {
        score: values.score,
        content: values.content,
        game_name: values.game_name,
        user_username: values.user_username,
        user_id: values.user_id,
        game_id: values.game_id
        }

        setCommentsArray([...commentsArray, newCommentObj])
    }

    const editComment = (values) => {

        const changedComment = {
            id: values.id,
            score: values.score,
            content: values.content,
            game_name: values.game_name,
            user_username: values.user_username,
            user_id: values.user_id,
            game_id: values.game_id
        }

        const updatedComments = [...commentsArray].map(comment => {
            if(comment.id === changedComment.id) {
                return changedComment
            } else {
                return comment
            }
        })
        setCommentsArray(updatedComments)

        // const updatedComments = [...commentsArray].map(comment => comment.id === changedComment.id ? changedComment : comment)
        // setCommentsArray(updatedComments)
    }

    const [favoritesArray, setFavoritesArray] = useState([])

    useEffect(() => {
        fetch('/favorites')
            .then(r => r.json())
            .then(setFavoritesArray)
    },[])

    const addFavorite = (newFavorite) => {
        setFavoritesArray([...favoritesArray, newFavorite])
    }

    const deleteFavorite = (favoriteId) => {
        setFavoritesArray(favoritesArray.filter(favorite => favorite.id !== favoriteId))
    }

    return (
        <UserProvider>
        <div className="">
            <Nav user={user} handleLogout={handleLogout}/>
            <Routes>
                <Route path="/users" element={<Users usersArray={usersArray} user={user}/>} />
                <Route path='games' element={<Games gamesArray={gamesArray} user={user} commentsArray={commentsArray}/>}/>
                <Route path='games/:gameId' element={<GamePage setUser={setUser} gamesArray={gamesArray} addComment={addComment} addFavorite={addFavorite} handleUpdate={handleUpdate} user={user} commentsArray={commentsArray} setCommentsArray={setCommentsArray}/>} />
                <Route path='profile' element={<Profile user={user} setUser={setUser} editComment={editComment} handleDeleteComment={handleDeleteComment} commentsArray={commentsArray} setCommentsArray={setCommentsArray} handleLogout={handleLogout} handleUpdate={handleUpdate} favoritesArray={favoritesArray} deleteFavorite={deleteFavorite} /> } />
                {/* <Route path='edit' element={<EditUserForm user={user} setUser={setUser} handleUpdate={handleUpdate}/>} /> */}
                <Route path="signup" element={<Signup />} />
                <Route path="/" element={<Login handleLogout={handleLogout} handleLogin={handleLogin} user={user}/>} />
            </Routes>
        </div>
        </UserProvider>
    );
}

export default App;
