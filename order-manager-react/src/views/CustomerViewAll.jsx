import CustomerAll from "../components/CustomerAll"
import MySpinner from "../components/MySpinner"
import obtainAllCustomer from "../utils/obtainAllCustomer"
//import obtainCustomer from "../utils/obtainCustomer"
import { useEffect, useState } from "react"

const CustomerViewAll = () => {

    const [allCustomers, setAllCustomers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        obtainAllCustomer(setAllCustomers, setLoading)
    },[])

    if(loading){
        return(
            <div>
                <h1>All Customers</h1>
                <MySpinner />
            </div>
        )
    }

    return(
        <div>
            <h1>All Customers</h1>
            <CustomerAll allCustomers={allCustomers}/>
        </div>
    )
}

export default CustomerViewAll