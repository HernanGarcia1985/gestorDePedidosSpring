import OrderCreateForm from "../components/OrderCreateForm"
import obtainAllAssets from "../utils/obtainAllAssets"
import obtainAllCustomer from "../utils/obtainAllCustomer"
import MySpinner from "../components/MySpinner"
import { useEffect, useState } from "react"

const OrderCreate = () => {

    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [allAssets, setAllAssets] = useState([])
    const [allCustomers, setAllCustomers] = useState([])

    useEffect(() =>{
        obtainAllCustomer(setAllCustomers, setLoading)
        obtainAllAssets(setAllAssets, setLoading2)
    },[])

    return(
        <div>
            <h1>Create a new Order</h1>
            { (loading || loading2) ? <MySpinner /> : <OrderCreateForm allCustomers={allCustomers} allAssets={allAssets} />}
        </div>
    )
}

export default OrderCreate