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
import ProtectedRouteAdmin from '../components/ProtectedRouteAdmin';
import TaxViewAll from '../views/TaxViewAll';
import TaxShow from '../views/TaxShow';
import TaxCreate from '../components/TaxCreateForm';
import OrderCreate from '../views/OrderCreate';
import OrderViewAll from '../views/OrderViewAll';
import OrderDetailTableShow from '../views/OrderDetailTableShow';
import OrderDetailValidate from '../views/OrderDetailValidate';
import HomeImageCloud from '../components/HomeImageCloud';
import ProtectedRouteUser from '../components/ProtectedRouteUser';
import UnderConstruction from '../components/UnderConstruction'

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomeImageCloud />} />
            <Route path="/auth/signup" element={<Register />} />
            <Route path="/auth/signin" element={<Login />} />
            <Route path='/customers/'
                    element= {
                        <ProtectedRouteUser 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <CustomerViewAll />
                        </ProtectedRouteUser>
                    } />
            <Route path='/customers/create'
                    element= {
                        <ProtectedRouteUser 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <CustomerCreate />
                        </ProtectedRouteUser>
                    } />
            <Route path='/customers/show' element={<CustomerSearch />} />
            <Route path='/customers/:id'
                    element= {
                        <ProtectedRouteUser 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <CustomerShow />
                        </ProtectedRouteUser>
                    } />
            <Route path='/assets/' 
                    element= {
                        <ProtectedRouteUser 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <AssetViewAll />
                        </ProtectedRouteUser>
                    } />
            <Route
                path='/assets/create'
                element= {
                    <ProtectedRouteAdmin 
                        user={localStorage.getItem('userLogged')}
                        redictPath="/auth/signin" >
                        <AssetCreate />
                    </ProtectedRouteAdmin>
                } />
            <Route path='/assets/:id'
                    element= {
                        <ProtectedRouteUser 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <AssetShow />
                        </ProtectedRouteUser>
                    } />   
            <Route path='/reports' element={<ReportCreate />} />
            <Route path='/reports/historicalOrders'
                    element= {
                        <ProtectedRouteAdmin 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <UnderConstruction />
                        </ProtectedRouteAdmin>
                    } />
            <Route path='/reports/biggestDiscount'
                    element= {
                        <ProtectedRouteAdmin 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <UnderConstruction />
                        </ProtectedRouteAdmin>
                    } />
            <Route path='/reports/totalDiscount'
                    element= {
                        <ProtectedRouteAdmin 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <UnderConstruction />
                        </ProtectedRouteAdmin>
                    } />
            <Route
                path='/taxes/create'
                element= {
                    <ProtectedRouteAdmin 
                        user={localStorage.getItem('userLogged')}
                        redictPath="/auth/signin" >
                        <TaxCreate />
                    </ProtectedRouteAdmin>
                } />
            <Route path='/taxes/:id'
                    element= {
                        <ProtectedRouteUser 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <TaxShow />
                        </ProtectedRouteUser>
                    } /> 
            <Route path='/taxes/'
                    element= {
                        <ProtectedRouteUser 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <TaxViewAll />
                        </ProtectedRouteUser>
                    } />
            <Route path='/orders/create'
                    element= {
                        <ProtectedRouteUser 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <OrderCreate />
                        </ProtectedRouteUser>
                    } />
            <Route path='/orders/'
                    element= {
                        <ProtectedRouteUser 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <OrderViewAll />
                        </ProtectedRouteUser>
                    } />
            <Route path='/orders/validate'
                    element= {
                        <ProtectedRouteUser 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <OrderDetailValidate />
                        </ProtectedRouteUser>
                    } />
            <Route path='/orders/:id'
                    element= {
                        <ProtectedRouteUser 
                            user={localStorage.getItem('userLogged')}
                            redictPath="/auth/signin" >
                            <OrderDetailTableShow />
                        </ProtectedRouteUser>
                    } /> 
        </Routes>    
    )
}

export default RoutesApp