import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import OrderDetail from "../components/OrderDetail"
import obtainOrder from "../utils/obtainOrder"
import obtainAllAssets from "../utils/obtainAllAssets"
import MySpinner from "../components/MySpinner"

const OrderShow = () => {

    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [allAssets, setAllAssets] = useState([])

    const {id} = useParams()

    useEffect(() =>{
        obtainOrder(id, setOrder, setLoading)
        obtainAllAssets(setAllAssets, setLoading2)
    },[])

    return(
        <div>
            <h1>Show Order</h1>
            { (loading || loading2) ? <MySpinner /> : <OrderDetail order={order} allAssets={allAssets}/>}
        </div>
    )
}

export default OrderShow