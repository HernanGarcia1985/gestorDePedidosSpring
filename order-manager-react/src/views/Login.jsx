import React, { useState } from 'react'
import ModalRegisterLogin from '../components/ModalRegisterLogin'

import loginUser from "../utils/authUser"



const Login = () => {
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [showModal, setShowModal] = useState(false)


    const noValidate =
        !(loginUsername.length &&
            loginPassword.length > 7

        )

    const login = (e) => {
        e.preventDefault()
        loginUser(loginUsername, loginPassword, setShowModal)
    }


    const handleHide = () => {
        setShowModal(false)

    }

    return (
        <>
            <form className="d-flex flex-column align-items-center">
                <div className="form-group  text-center">
                    <label className="form-label mt-4 ">Enter your username</label>
                    <input type="username"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter your username"
                        onChange={(e) => { setLoginUsername(e.target.value) }}
                    />
                </div>
                <div className="form-group text-center">
                    <label className="form-label mt-4">Enter your password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        onChange={(e) => { setLoginPassword(e.target.value) }}
                    />
                </div>
                <button type="submit"
                    className="btn btn-primary mt-3"
                    disabled={noValidate}
                    onClick={login}>
                    Submit
                </button>

                
                <h6 className="mx-3  mt-3 text-center">If you have problems logging into your account please send an email to hernang1985@gmail.com</h6>
            </form>


            <ModalRegisterLogin
                show={showModal}
                onHide={handleHide}
                message="Thank you" />



        </>



    )
}

export default Login