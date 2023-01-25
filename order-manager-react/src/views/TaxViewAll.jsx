import TaxAll from "../components/TaxAll"
import MySpinner from "../components/MySpinner"
import obtainAllTaxes from "../utils/obtainAllTaxes"
import { useEffect, useState } from "react"

const TaxViewAll = () => {

    const [allTaxes, setAllTaxes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        obtainAllTaxes(setAllTaxes, setLoading)
    },[])

    if(loading){
        return(
            <div>
                <h1>All Taxes</h1>
                <MySpinner />
            </div>
        )
    }

    return(
        <div>
            <h1>All Taxes</h1>
            <TaxAll allTaxes={allTaxes}/>
        </div>
    )
}

export default TaxViewAll