import {useState, useContext} from 'react'
import {useFormik} from "formik"
import * as yup from "yup"
import {UserContext} from "../Context/user"


function AddReply({comment_id}){

    const [showAddReply, setShowAddReply] = useState(false)
    const {user, setUser} = useContext(UserContext)

	const toggleAddReply = () => {
		setShowAddReply(!showAddReply)
	}

    const formSchema = yup.object().shape({
        
        reply: yup
        .string()
        .required('Required'),
    })

	const formik = useFormik({
        initialValues: {
        reply: "",
        user_id: user?.id,
        comment_id: comment_id
        },
        enableReinitialize: true,
        validationSchema: formSchema,
        onSubmit: (values) => { 
            fetch(`/comments/${comment_id}/replies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => { 
                if (response.ok) {
                    response.json().then((response) => { console.log(response)
                    
                        // const newReply = {
                        //     ...user,
                        //     comments: [
                        //         {
                        //             ...user?.comments,
                        //             replies: [
                        //                 ...user?.comments?.replies, response 
                        //             ]
                        //         }
                        //     ]    
                        // }
                        // setUser(newReply)

                        // const newGame = {
                        //     ...game,
                        //     comments: [
                        //         ...game?.comments, response
                        //     ]
                        // }
                        // setGame(newGame)

                        // const newComments = [...commentsArray, response]
                        // setCommentsArray(newComments)
                    })
                }
            })
			toggleAddReply()
        },
    });



    return(
		<div>
			<button onClick={toggleAddReply} className="text-center hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-2 rounded my-1">Reply</button>
		{showAddReply &&
        <div className="fixed top-0 left-0 w-full h-full bg-zinc-800 bg-opacity-50 flex justify-center items-center">
			<div className="max-w-2xl py-20 mx-auto rounded-2xl shadow-lg p-8 my-16 bg-zinc-800">
            <div>
                <h2 className="text-3xl py-4 px-4 font-bold tracking-tight text-gray-900">Reply To This Comment</h2>
            </div>
			<div>
				<form className="space-y-6" onSubmit={formik.handleSubmit}>
					<div className="">
						<label className="block text-sm font-medium leading-6 text-gray-900">Reply: </label>
						<div className="mt-2">
							<input
								type="text"
								name="reply"
								value={formik.values.reply}
                                onChange={formik.handleChange}
								className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<p className="formikReqs"> {formik.errors.reply}</p>
						</div>
						
						<button type="submit"className="flex w-full justify-center rounded-md bg-sky-950 px-3 my-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-200 hover:text-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200">Add Reply</button>
						<button onClick={toggleAddReply} className="flex w-full justify-center rounded-md bg-sky-950 px-3 my-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-200 hover:text-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200">Close Form</button>
					</div>
				</form>
			</div>
			</div>
        </div>
}
		</div>
    )
}

export default AddReply