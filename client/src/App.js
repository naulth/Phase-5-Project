import React, {useState, useEffect, useContext} from "react"
import {Routes, Route, useNavigate} from "react-router-dom"

import Signup from "./Components/Signup"
import Login from "./Components/Login"
import Nav from "./Components/Nav"
import Games from "./Components/Games"
import Profile from "./Components/Profile"
import GamePage from "./Components/GamePage"
import Users from "./Components/Users"
import OtherUserProfile from "./Components/OtherUserProfile"
import CommentFeed from "./Components/CommentFeed"
import AddReply from "./Components/AddReply"

import {UserContext} from "./Context/user"
import {FavoritesContext} from "./Context/favorites"
import {CommentsContext} from "./Context/comments"
import { UsersArrayContext } from "./Context/usersArray"
import { GamesArrayContext } from "./Context/gamesArray"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import EditUserForm from "./Components/EditUserForm"
library.add(faEye,faEyeSlash)



function App() {

    const {favoritesArray, setFavoritesArray} = useContext(FavoritesContext)
    const {user, setUser} = useContext(UserContext)
    const {commentsArray, setCommentsArray} = useContext(CommentsContext)
    const {usersArray, setUsersArray} = useContext(UsersArrayContext)
    const {gamesArray, setGamesArray} = useContext(GamesArrayContext)


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


    // useEffect(() => {
    //     fetch('/games')
    //         .then(r => r.json())
    //         .then(setGamesArray)
    // },[])


    // useEffect(() => {
    //     fetch('/users')
    //         .then(r => r.json())
    //         .then(setUsersArray)
    // },[])

    const handleDeleteComment = (deadCommentId) => {


       const newUser = {
            ...user,
            comments: [
                ...user?.comments?.filter(comment => comment.id !== deadCommentId)
            ]
        }    
        setUser(newUser)

        const newComments = [...commentsArray]?.filter(comment => comment.id !== deadCommentId)
        setCommentsArray(newComments)
    }


    const deleteUser = (userId) => setUsersArray(usersArray.filter(user => user.id !== userId))

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

        const newUser = {
            ...user,
            comments: [
                ...user?.comments?.map(comment => {
                    if(comment?.id === changedComment.id) {
                        return changedComment
                    } else {
                        return comment
                    }
                })
            ]
        }    
        setUser(newUser)
    }

    useEffect(() => {
        fetch("/check_session").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            } else {
                console.log(response.status)
                response.text().then(console.warn)
            }
        });
    }, []);

    // useEffect(() => {
    //     fetch('/comments')
    //     .then((res) => {
    //         if (res.ok) {
    //             res.json().then((r) => {
    //                 setCommentsArray(r)
    //             })
    //         }
    //     })
            
    // },[])

    // useEffect(() => {
    //     fetch('/favorites')
    //     .then((res) => {
    //         if (res.ok) {
    //             res.json().then((r) => {
    //                 setFavoritesArray(r)
    //             })
    //         }
    //     })
    // },[])

    // const [ followers, setFollowers] = useState([])

    // useEffect(() => {
    //     fetch(`/followers/${user.id}`)
    //     .then((res) => {
    //         if (res.ok) {
    //             res.json().then((r) => {
    //                 setFollowers(r)
    //             })
    //         } else {
    //             console.log('comments fetched not ok')
    //         }
    //     })
            
    // },[])

    const deleteFavorite = (favoriteId) => {
        const newUser = {
            ...user,
            favorites: [
                ...user?.favorites?.filter(favorite => favorite.id !== favoriteId)
            ]
            }    
            setUser(newUser)
    }

    return (
        <div className="">
            <Nav user={user} handleLogout={handleLogout}/>
            <Routes>
                <Route path="/users" element={<Users />} />
                <Route path='users/:userId' element={<OtherUserProfile/>} />
                <Route path='games' element={<Games gamesArray={gamesArray} user={user} />}/>
                <Route path='games/:gameId' element={<GamePage setUser={setUser} gamesArray={gamesArray} handleUpdate={handleUpdate} user={user} />} />
                <Route path='profile' element={<Profile deleteUser={deleteUser} user={user} setUser={setUser} editComment={editComment} handleDeleteComment={handleDeleteComment}  handleLogout={handleLogout} handleUpdate={handleUpdate} deleteFavorite={deleteFavorite} /> } />
                <Route path="signup" element={<Signup />} />
                <Route path="/" element={<Login handleLogout={handleLogout} handleLogin={handleLogin} user={user}/>} />
                <Route path="feed" element={<CommentFeed/> }/>
            </Routes>
        </div>
       
    );
}

export default App;
