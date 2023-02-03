const createOrder = async (idCustomer, orderDetailList) => {

    
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