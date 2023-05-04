import React, {useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useFormik} from "formik"
import * as yup from "yup"
import {useNavigate} from 'react-router-dom'

function Signup(){

    const [showPassword, setShowPassword] = useState(false)


    const handleShow = () => {
        setShowPassword(!showPassword)
    }

  

    const formSchema = yup.object().shape({
        username: yup
        .string()
        .min(5, 'Username must include at least 5 characters.')
        .required('Required'),
        password: yup
        .string()
        .required('Required')
        .min(8, 'Password must include at least 8 characters.')
        .matches(/[0-9]/, 'Password requires a number.')
        .matches(/[a-z]/, 'Password requires a lowercase letter.')
        .matches(/[A-Z]/, 'Password requires an uppercase letter.')
        .matches(/[^\w]/, 'Password requires a symbol.'),
        confirm: yup
        .string()
        .required('Required')
        .oneOf([yup.ref('password'), null], 'Must match "Password" value'),
        first_name: yup
        .string()
        .required('Required'),
        last_name: yup
        .string()
        .required('Required'),
        birthDate: yup
        .date()
        .max(new Date(Date.now() - 567648000000), "You must be at least 18 years old to sign up.")
        .required('Required'),
        profileImage: yup
        .string()
        .required('Required'),
    })

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
        username: "",
        password: "",
        confirm: "",
        first_name: "",
        last_name: "",
        birthDate: "",
        profileImage: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((r) => {
                if (r.ok) {
                    navigate('/')
                }
            })
        },
    });

    // fetch("/login", {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json",},
    //     body: JSON.stringify({username, password})
    // }).then((r) => {
    //     if (r.ok) {
    //         r.json().then((user) => handleLogin(user))
    //         navigate("/profile")
    //     } else {
    //         toggleIncorrect()
    //     }
    // })



    return(
        <div className="HomeImg">
        <div >
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
            <div className="text-center">
            <div className="py-12">
                <h1 className="mt-10 text-center text-8xl font-bold leading-9 tracking-tight text-lime-300">LoggedOn</h1>
            </div>
                <h2 className="my-10 text-center text-4xl font-bold leading-9 tracking-tight text-lime-200">Create Your New Account</h2>
                <p className="block text-md font-medium leading-6 text-lime-100">Please ensure all fields are complete and valid.</p>
            </div>
            <div>
            <div className="mt-10 max-w-3xl mx-auto">
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-lime-100">Username</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md bg-lime-100 border-0 px-4 py-1.5 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.username}</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-lime-100">Date of Birth</label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="birthDate"
                                value={formik.values.birthDate}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md border-0 bg-lime-100 px-4 py-1.5 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.birthDate}</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-lime-100">First Name</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="first_name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md border-0 bg-lime-100 px-4 py-1.5 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.first_name}</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-lime-100">Last Name</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="last_name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md border-0 bg-lime-100 px-4 py-1.5 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.last_name}</p>
                        </div>
                    </div>
                    
                    
                    
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-lime-100">Password</label>
                        <div className="z-0 relative w-full">
                            <div className="absolute inset-y-4 right-0 flex items-center px-2">
                                <input className="hidden js-password-toggle" id="toggle" type="checkbox" />
                                <span className="z-auto ">
                                    {showPassword ? <FontAwesomeIcon icon="fa-solid fa-eye" onClick={handleShow}/> :  <FontAwesomeIcon icon="fa-solid fa-eye-slash" onClick={handleShow}/>
                                    }
                                </span>
                            </div>
                            <div className="mt-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md bg-lime-100 border-0 py-1.5 px-4 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.password}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-lime-100">Confirm Password</label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="confirm"
                                value={formik.values.confirm}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md border-0 bg-lime-100 py-1.5 px-4 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.confirm}</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-lime-100">Profile Image URL</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="profileImage"
                                value={formik.values.profileImage}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md border-0 bg-lime-100 px-4 py-1.5 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.profileImage}</p>
                        </div>
                    </div>
                    <input
                        type="submit"
                        name="submit"
                        className="w-full col-span-2 h-9 justify-center rounded-md bg-lime-300 mt-8 px-3 py-1.5 text-lg font-semibold leading-6 text-zinc-950 shadow-sm hover:bg-lime-100 hover:text-zinc-950"
                    />
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Signup