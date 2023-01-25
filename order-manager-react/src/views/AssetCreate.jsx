import AssetCreateForm from "../components/AssetCreateForm"
import obtainAllTaxes from "../utils/obtainAllTaxes"
import MySpinner from "../components/MySpinner"
import { useEffect, useState } from "react"

const AssetCreate = () => {

    const [loading, setLoading] = useState(true)
    const [allTaxes, setAllTaxes] = useState([])

    useEffect(() =>{
        obtainAllTaxes(setAllTaxes, setLoading)
    },[])

    return(
        <div>
            <h1>Create a new Asset</h1>
            { loading ? <MySpinner /> : <AssetCreateForm allTaxes={allTaxes} />}
        </div>
    )
}

export default AssetCreate