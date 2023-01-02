import React, { useState } from 'react'
import ModalRegister from '../components/ModalRegister'

import createUser from "../utils/createUser"

const Register = () => {

    const [registerEmail, setRegisterEmail] = useState('')
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [showModal, setShowModal] = useState(false)

    const register = (e) => {
        e.preventDefault()
        createUser(registerEmail, registerUsername, registerPassword, setShowModal)
    }

    const handleHide = () => {
        setShowModal(false)

    }

    const noValidate =
        !(registerEmail.length &&
            registerPassword.length > 7 &&
            registerEmail.includes('@')
        )

    return(
        <>
            <form className="d-flex flex-column align-items-center">
                <div className="form-group  text-center">
                    <label className="form-label mt-4 ">Enter your email</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="email@email.com"
                        onChange={(e) => { setRegisterEmail(e.target.value) }}
                    />
                </div>
                <div className="form-group  text-center">
                    <label className="form-label mt-4 ">Enter your username</label>
                    <input type="username"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        placeholder="username"
                        onChange={(e) => { setRegisterUsername(e.target.value) }}
                    />
                </div>
                <div className="form-group text-center">
                    <label className="form-label mt-4">Choose a strong password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="At least 8 characters"
                        onChange={(e) => { setRegisterPassword(e.target.value) }}
                    />
                </div>
                

                <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    disabled={noValidate}
                    onClick={register}>
                    SignUp
                </button>
                <h6 className="mx-3  mt-3 text-center">If you have problems creating a new account please send an email to hernang1985@gmail.com</h6>
            </form>
            <ModalRegister
                show={showModal}
                onHide={handleHide}
                message="Successful registration please log in with your username and password"
            />
        </>
    )
}

export default Register;