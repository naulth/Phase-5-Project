import React, {useState, useContext} from 'react'
import {useFormik} from "formik"
import * as yup from "yup"
import {useNavigate} from 'react-router-dom'
import {UserContext} from "../Context/user"


function EditCommentForm({theId, editComment, gameImage, game_id, gamename}){

    const {user} = useContext(UserContext)

    const navigate = useNavigate()

    const [showEditComment, setShowEditComment] = useState(false)

    const toggleEditComment = () => {
        setShowEditComment(!showEditComment)
    }

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
        id: theId,
        game_name: gamename,
        game_image: gameImage,
        user_username: user?.username,
        user_image: user?.image,
        game_id: game_id,
        user_id: user?.id
        },
        enableReinitialize: true,
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/comments/${theId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
			
			editComment(values)
            toggleEditComment()

        },
    });

    // const handleEditComment = (e) => {
    //     e.preventDefault()

    //     const changedComment = {
    //         id: theId,
    //         score: score,
    //         content: comment,
    //     }

    //     fetch(`/comments/${theId}`, {
    //         method: "PATCH",
    //         headers: {'Content-Type' : 'application/json'},
    //         body: JSON.stringify(changedComment)
    //     }).then((r) => {
    //     if (r.ok) {
    //       r.json().then((r) => {
    //         editComment(r)
    //     });
    //     }
    // })

    //     // editComment(changedComment

	// 	toggleEditComment()
    // }


    return(
        <div>
            <button onClick={toggleEditComment} className="hover:bg-zinc-900 hover:text-lime-200 text-sm w-20 text-lime-200 border border-lime-200 shadow font-bold py-1 px-4 my-1">Edit</button>

        {showEditComment &&
        <div className="fixed top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-50 flex justify-center items-center">
			<div className="max-w-2xl py-20 mx-auto border border-lime-100 shadow-lg p-8 my-16 bg-zinc-900">
            <div>
                <h2 className="text-3xl text-center pb-4 px-4 font-bold tracking-tight text-lime-300">Edit Comment</h2>
            </div>
			<div>
				<form className="space-y-6" onSubmit={formik.handleSubmit}>
					<div className="">
						<label className="block text-left text-sm font-medium leading-6 text-lime-200">Score: </label>
						<div className="mt-2">
							<input
								type="number"
								name="score"
								value={formik.values.score}
                                onChange={formik.handleChange}
								className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
						<label className="block text-left text-sm font-medium leading-6 text-lime-200">Comment: </label>
						<div className="mt-2">
							<input
								type="text"
								name="content"
								value={formik.values.content}
                                onChange={formik.handleChange}
								className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
                        <div className="flex mt-6 ">
                            <button type="submit"className=" border border-lime-300 flex mt-2 mx-2 justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm  leading-6 text-lime-300  font-bold shadow-sm hover:bg-lime-200 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">Edit Comment</button>
                            <button onClick={toggleEditComment} className=" border border-lime-300 flex mt-2 mx-2 justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm  leading-6 text-lime-300  font-bold shadow-sm hover:bg-lime-200 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">Close Form</button>
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

export default EditCommentForm