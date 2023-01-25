import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TaxDetail from "../components/TaxDetail"
import obtainTax from "../utils/obtainTax"
import MySpinner from "../components/MySpinner"

const TaxShow = () => {

    const [tax, setTax] = useState([])
    const [loading, setLoading] = useState(true)

    const {id} = useParams()

    useEffect(() =>{
        obtainTax(id, setTax, setLoading)
    },[])

    return(
        <div>
            <h1>Show Tax</h1>
            { loading ? <MySpinner /> : <TaxDetail tax={tax} />}
        </div>
    )
}

export default TaxShow