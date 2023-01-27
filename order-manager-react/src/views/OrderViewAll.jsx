import OrderAll from "../components/OrderAll"
import MySpinner from "../components/MySpinner"
import obtainAllOrders from "../utils/obtainAllOrders"
import { useEffect, useState } from "react"

const OrderViewAll = () => {

    const [allOrders, setAllOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        obtainAllOrders(setAllOrders, setLoading)
    },[])

    if(loading){
        return(
            <div>
                <h1>All Orders</h1>
                <MySpinner />
            </div>
        )
    }

    return(
        <div>
            <h1>All Orders</h1>
            <OrderAll allOrders={allOrders}/>
        </div>
    )
}

export default OrderViewAll