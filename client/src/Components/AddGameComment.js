import React, {useState, useContext} from 'react'
import {useFormik} from "formik"
import * as yup from "yup"
import {UserContext} from "../Context/user"
import { GameContext } from '../Context/game'
import { CommentsContext } from '../Context/comments'

function AddGameComment({}){

    const {user, setUser} = useContext(UserContext)
    const {game, setGame} = useContext(GameContext)
    const {commentsArray, setCommentsArray} = useContext(CommentsContext)
    

	const formSchema = yup.object().shape({
        score: yup
        .number()
        .min(1, 'Score must be between 1 and 10.')
		.max(10, 'Score must be between 1 and 10.')
        .required('Required'),
        content: yup
        .string()
        .required('Required'),
    })

	const formik = useFormik({
        initialValues: {
        score: "",
        content: "",
        game_name: game?.title,
        game_image: game?.image,
        user_username: user?.username,
        user_image: user?.image,
        user_id: user?.id,
        game_id: game?.id
        },
        enableReinitialize: true,
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((response) => {
                    
                        const newUser = {
                            ...user,
                            comments: [
                                ...user?.comments, response 
                            ]
                        }
                        setUser(newUser)

                        const newGame = {
                            ...game,
                            comments: [
                                ...game?.comments, response
                            ]
                        }
                        setGame(newGame)

                        const newComments = [...commentsArray, response]
                        setCommentsArray(newComments)
                    })
                }
            })
			toggleAddComment()
        },
    });

	// const createComment = (e) => {
    //     e.preventDefault()

    //     const newComment = {
    //         score: score,
    //         content: comment,
    //         game_id: gameId,
    //         user_id: user.id,
    //         user_username: user.username,
    //         game_name: game.title
    //     }

    //     fetch('/comments', {
    //         method: "POST",
    //         headers: {'Content-Type' : 'application/json'},
    //         body: JSON.stringify(newComment)
    //     })

    //     

    //     setScore('')
    //     setComment('')
	// 	toggleAddComment()
    // }

	const [showAddComment, setShowAddComment] = useState(false)

	const toggleAddComment = () => {
		setShowAddComment(!showAddComment)
	}

    return(
		<div>
			<button onClick={toggleAddComment} className="text-center hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-2 rounded my-1">Add Comment</button>
		{showAddComment &&
        <div className="fixed top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-50 flex justify-center items-center">
			<div className="max-w-2xl py-20 mx-auto border border-lime-100 shadow-lg p-8 my-16 bg-zinc-900">
            <div>
                <h2 className="text-3xl pb-4 px-4 font-bold tracking-tight text-lime-300">Add a Comment</h2>
            </div>
			<div>
				<form className="space-y-6" onSubmit={formik.handleSubmit}>
					<div className="">
						<label className="block text-sm font-medium leading-6 text-lime-200">Score: </label>
						<div className="mt-2 pb-2">
							<input
								type="number"
								name="score"
								value={formik.values.score}
                                onChange={formik.handleChange}
								className="block w-full bg-lime-100 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<p className="formikReqs"> {formik.errors.score}</p>
						</div>
						<label className="block text-sm font-medium leading-6 text-lime-200">Comment: </label>
						<div className="mt-2">
							<input
								type="text"
								name="content"
								value={formik.values.content}
                                onChange={formik.handleChange}
								className="block bg-lime-100 w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<p className="formikReqs"> {formik.errors.content}</p>
						</div>
						<div className="flex mt-6">
                            <button type="submit"className=" border border-lime-300 flex mt-2 mx-2 justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm  leading-6 text-lime-300  font-bold shadow-sm hover:bg-lime-200 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">Add Comment</button>
                            <button onClick={toggleAddComment} className=" border border-lime-300 flex mt-2 mx-2 justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm  leading-6 text-lime-300  font-bold shadow-sm hover:bg-lime-200 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">Close Form</button>
                        </div>
					</div>
				</form>
			</div>
			</div>
        </div>
}
		</div>
    )
}

export default AddGameComment