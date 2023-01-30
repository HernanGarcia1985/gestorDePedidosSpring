const createOrder = async (idCustomer, assetListUpdated, quantity, yearsWarranty) => {
    
    let orderDetailList = [];
    let qty;
    let years;
    let product;
    let ownService;

    assetListUpdated.map(asset => {
        let qtyFound = quantity && quantity.length ? quantity.filter(x => {
            return x.idAsset === asset.id
        }) : [];
        qty = qtyFound.length ? qtyFound[0].qty : null;

        let yearsFound = yearsWarranty && yearsWarranty.length ? yearsWarranty.filter(x => {
            return x.idAsset === asset.id
        }) : [];
        years = yearsFound.length ? yearsFound[0].years : null;

        if(asset.assetType.toLowerCase() === 'product'){
            product = {
                id: asset.id,
                name: asset.name,
                basePrice: asset.basePrice,
                warrantyPercentage: asset.warrantyPercentage
                //taxList faltaría no es necesaria
            }
            ownService = null;
        } else {
            product = null;
            ownService = {
                id: asset.id,
                name: asset.name,
                basePrice: asset.basePrice,
                special: asset.special,
                supportCharge: asset.supportCharge
                //taxList faltaría no es necesaria
            }
        }

        orderDetailList.push({
            id: null,
            quantity: qty,
            yearsWarranty: years,
            product: product,
            ownService: ownService,
            order: null
        })
    })
    
    let url = 'http://localhost:8080/orders/';

    let newOrder = {
        idCustomer: idCustomer,
        orderDetailList: orderDetailList
    }

    let data = {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
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
                    alert("Failed to create a new order. Error: " + data.exception);
                } else {
                    alert("Order was created successfully!");
                }    
            });        
    } catch (error) {
        alert("Something went wrong trying to create a new order. Please try again. Error: "+ error);                        
    }
}

export default createOrder