import React from 'react'
import { Route, Routes } from "react-router-dom";
import CustomerCreate from '../views/CustomerCreate';
import CustomerShow from '../views/CustomerShow';
import Login from '../views/Login';
import Register from '../views/Register'
import Report from '../views/Report'
import ReportCreate from '../views/ReportCreate';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth/signup" element={<Register />} />
            <Route path="/auth/signin" element={<Login />} />
            <Route path='/customers/create' element={<CustomerCreate />} />
            <Route path='/customers/:id' element={<CustomerShow />} />
            <Route path='/reports' element={<ReportCreate />} />
            <Route path='/reports/historicalOrders' element={<Report />} />
        </Routes>    
    )
}

export default RoutesApp