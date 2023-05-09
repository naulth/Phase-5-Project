import {useState, useContext} from 'react'
import {useFormik} from "formik"
import * as yup from "yup"
import {UserContext} from "../Context/user"
import { TargetUserContext } from '../Context/targetUser'



function AddTargetReply({comment_id, user_id, username}) {

    const [showAddReply, setShowAddReply] = useState(false)
    const {user, setUser} = useContext(UserContext)
    const {targetUser, setTargetUser} = useContext(TargetUserContext)

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
        user_username: user?.username,
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
                    response.json().then((response) => {
                        
                        const commentIndex = targetUser?.comments?.findIndex((c) => c.id === response?.comment_id);
                        if (commentIndex === -1) {
                            console.log(`Comment ${response?.comment_id} not found in target user's comments array.`);
                            return;
                        }
                        const updatedComments = [...targetUser?.comments];
                        const comment = updatedComments[commentIndex];

                        comment?.replies?.push(response);

                
                        const updatedTargetUser = { ...targetUser, comments: updatedComments };

                        setTargetUser(updatedTargetUser);
                        
                    })
                }
            })
			toggleAddReply()
        },
    });





    return (
        <div>
			<button onClick={toggleAddReply} className="hover:bg-zinc-800 hover:text-lime-100 py-1 mb-4 text-lime-200 border border-lime-100 shadow font-bold px-4">Reply</button>
            {showAddReply &&
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800 bg-opacity-50 flex justify-center items-center">
                <div className="max-w-2xl w-1/3 py-20 mx-auto border border-lime-100 p-8 my-16 bg-zinc-900">
                <div>
                    <h2 className="text-3xl py-4  font-bold text-left tracking-tight text-lime-300">Reply To {username}</h2>
                </div>
                <div>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="">
                            <label className="block text-sm text-left font-medium leading-6 text-lime-200">Reply: </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="reply"
                                    value={formik.values.reply}
                                    onChange={formik.handleChange}
                                    className="block w-full bg-lime-100 border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className="formikReqs"> {formik.errors.reply}</p>
                            </div>
                            <div className="flex mt-4 ">
                                <button type="submit" className=" border border-lime-300 flex w-1/4 mt-2 mx-2 justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm  leading-6 text-lime-300  font-bold shadow-sm hover:bg-lime-200 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">Add Reply</button>
                                <button onClick={toggleAddReply} className=" border border-lime-300 flex w-1/4 mt-2 mx-2 justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm  leading-6 text-lime-300  font-bold shadow-sm hover:bg-lime-200 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">Close Form</button>
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

export default AddTargetReply