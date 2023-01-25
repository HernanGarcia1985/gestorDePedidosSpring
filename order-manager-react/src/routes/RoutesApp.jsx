import React from 'react'
import { Route, Routes } from "react-router-dom";
import CustomerCreate from '../views/CustomerCreate';
import CustomerShow from '../views/CustomerShow';
import CustomerViewAll from '../views/CustomerViewAll';
import Login from '../views/Login';
import Register from '../views/Register'
import Report from '../views/Report'
import ReportCreate from '../views/ReportCreate';
import CustomerSearch from '../components/CustomerSearch';
import AssetCreate from '../views/AssetCreate';
import AssetShow from '../views/AssetShow';
import AssetViewAll from '../views/AssetViewAll';
import ProtectedRoute from '../components/ProtectedRoute';
import TaxViewAll from '../views/TaxViewAll';
import TaxShow from '../views/TaxShow';
import TaxCreate from '../components/TaxCreateForm';

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth/signup" element={<Register />} />
            <Route path="/auth/signin" element={<Login />} />
            <Route path='/customers/' element={<CustomerViewAll />} />
            <Route path='/customers/create' element={<CustomerCreate />} />
            <Route path='/customers/show' element={<CustomerSearch />} />
            <Route path='/customers/:id' element={<CustomerShow />} />
            <Route path='/assets/' element={<AssetViewAll />} />
            <Route
                path='/assets/create'
                element= {
                    <ProtectedRoute 
                        user={localStorage.getItem('userLogged')}
                        redictPath="/auth/signin" >
                        <AssetCreate />
                    </ProtectedRoute>
                } />
            <Route path='/assets/:id' element={<AssetShow />} />   
            <Route path='/reports' element={<ReportCreate />} />
            <Route path='/reports/historicalOrders' element={<Report />} />
            <Route
                path='/taxes/create'
                element= {
                    <ProtectedRoute 
                        user={localStorage.getItem('userLogged')}
                        redictPath="/auth/signin" >
                        <TaxCreate />
                    </ProtectedRoute>
                } />
            <Route path='/taxes/:id' element={<TaxShow />} /> 
            <Route path='/taxes/' element={<TaxViewAll />} />
        </Routes>    
    )
}

export default RoutesApp