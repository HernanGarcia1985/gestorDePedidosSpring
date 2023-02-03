import { useEffect, useState } from "react"
import OrderDetailTable from "../components/OrderDetailTable"
import MySpinner from "../components/MySpinner"
import validateOrder from "../utils/validateOrder"
import { useLocation } from "react-router-dom"

const OrderDetailValidate = () => {

    const idCustomer = useLocation().state.idCustomer;
    const assetListUpdated = useLocation().state.assetListUpdated;
    const quantity = useLocation().state.quantity;
    const yearsWarranty = useLocation().state.yearsWarranty;

    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
    

    useEffect(() =>{
        validateOrder(idCustomer, assetListUpdated, quantity, yearsWarranty, setOrder, setLoading)
    },[])

    return(
        <div>
            <h1>Order Detail</h1>
            { loading ? <MySpinner /> : <OrderDetailTable order={order}/>}
        </div>
    )
}

export default OrderDetailValidate