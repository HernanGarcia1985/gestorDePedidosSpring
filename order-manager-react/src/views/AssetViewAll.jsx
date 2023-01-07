import AssetAll from "../components/AssetAll"
import MySpinner from "../components/MySpinner"
import obtainAllAssets from "../utils/obtainAllAssets"
import { useEffect, useState } from "react"

const AssetViewAll = () => {

    const [allAssets, setAllAssets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        obtainAllAssets(setAllAssets, setLoading)
    },[])

    if(loading){
        return(
            <div>
                <h1>All Assets</h1>
                <MySpinner />
            </div>
        )
    }

    return(
        <div>
            <h1>All Assets</h1>
            <AssetAll allAssets={allAssets}/>
        </div>
    )
}

export default AssetViewAll