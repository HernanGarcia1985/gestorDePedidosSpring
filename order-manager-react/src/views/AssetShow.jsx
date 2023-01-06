import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AssetDetail from "../components/AssetDetail"
import obtainAsset from "../utils/obtainAsset"
import MySpinner from "../components/MySpinner"

const AssetShow = () => {

    const [asset, setAsset] = useState([])
    const [loading, setLoading] = useState(true)

    const {id} = useParams()

    useEffect(() =>{
        obtainAsset(id, setAsset, setLoading)
    },[])

    return(
        <div>
            <h1>Show Asset</h1>
            { loading ? <MySpinner /> : <AssetDetail asset={asset} />
            }
        </div>
    )
}

export default AssetShow