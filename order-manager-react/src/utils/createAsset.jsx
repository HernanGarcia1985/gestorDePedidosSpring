const createAsset = async (assetType, name, basePrice, special, supportCharge, warrantyPercentage) => {
    
    //console.log (assetType, name, basePrice, special, supportCharge, warrantyPercentage)
    
    let url = 'http://localhost:8080/assets/';

    let newAsset = {
        assetType: assetType,
        name: name,
        basePrice: basePrice,
        special: special,
        supportCharge: supportCharge,
        warrantyPercentage: warrantyPercentage,
    }

    let data = {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAsset)
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
                    alert("Failed to create a new asset. Error: " + data.exception);
                } else {
                    alert("Asset was created successfully!");
                }    
            });        
    } catch (error) {
        alert("Something went wrong trying to create a new asset. Please try again. Error: "+ error);                        
    }
}

export default createAsset