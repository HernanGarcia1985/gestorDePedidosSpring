import React from 'react'
import { Route, Routes } from "react-router-dom";

import Login from '../views/Login';
import Register from '../views/Register'
import Error404 from '../views/Error404'

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/auth/signin" element={<Login />} />
            <Route  element={<Error404 />} />                      
        </Routes>    
    )
}

export default RoutesApp