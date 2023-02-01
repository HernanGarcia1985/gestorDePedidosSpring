import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import OrderDetailTable from "../components/OrderDetailTable"
import obtainOrder from "../utils/obtainOrder"
import MySpinner from "../components/MySpinner"

const OrderDetailTableShow = () => {

    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
     

    const {id} = useParams()

    useEffect(() =>{
        obtainOrder(id, setOrder, setLoading)
    },[])

    return(
        <div>
            <h1>Order Detail</h1>
            { loading ? <MySpinner /> : <OrderDetailTable order={order}/>}
        </div>
    )
}

export default OrderDetailTableShow