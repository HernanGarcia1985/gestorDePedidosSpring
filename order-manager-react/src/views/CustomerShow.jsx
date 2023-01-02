import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CustomerDetail from "../components/CustomerDetail"
import obtainCustomer from "../utils/obtainCustomer"
import MySpinner from "../components/MySpinner"

const CustomerShow = () => {

    const [customer, setCustomer] = useState([])
    const [loading, setLoading] = useState(true)

    const {id} = useParams()

    useEffect(() =>{
        obtainCustomer(id, setCustomer, setLoading)
    },[])

    return(
        <div>
            <h1>Show Customer</h1>
            { loading ? <MySpinner /> : <CustomerDetail customer={customer} />
            }
        </div>
    )
}

export default CustomerShow