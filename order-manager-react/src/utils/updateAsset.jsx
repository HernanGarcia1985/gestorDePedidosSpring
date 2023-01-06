const updateAsset = async (id, assetType, name, basePrice, special, supportCharge, warrantyPercentage) => {
    
    console.log (id, assetType, name, basePrice, special, supportCharge, warrantyPercentage)
    
    let url = 'http://localhost:8080/assets/'+id;

    let assetModified = {
        assetType: assetType,
        name: name,
        basePrice: basePrice,
        special: special,
        supportCharge: supportCharge,
        warrantyPercentage: warrantyPercentage
    }

    let data = {
        method: 'PUT',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(assetModified)
    }
    
    try {
        await fetch(url, data)
            .then(response => {
                if(response.ok){
                    return response.json()
                } else {
                    console.log("error")
                }
                })
            .then(data => {
                console.log(data)
                if(data.exception) {
                    alert("Something wrong Asset with id " + id + " not found");
                } else {
                    alert("Asset with id "+id+" was updated successfully!");
                }    
            });        
    } catch (error) {
        alert("Asset with id " + id + " not found. Error: " + error);                        
    }
}

export default updateAsset