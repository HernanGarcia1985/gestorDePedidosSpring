import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AssetDetail from "../components/AssetDetail"
import obtainAsset from "../utils/obtainAsset"
import MySpinner from "../components/MySpinner"
import obtainAllTaxes from "../utils/obtainAllTaxes"

const AssetShow = () => {

    const [asset, setAsset] = useState([])
    const [loading, setLoading] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [allTaxes, setAllTaxes] = useState([])

    const {id} = useParams()

    useEffect(() =>{
        obtainAllTaxes(setAllTaxes, setLoading)
        obtainAsset(id, setAsset, setLoading2)
    },[])

    return(
        <div>
            <h1>Show Asset</h1>
            { (loading || loading2) ? <MySpinner /> : <AssetDetail asset={asset} allTaxes={allTaxes} />
            }
        </div>
    )
}

export default AssetShow