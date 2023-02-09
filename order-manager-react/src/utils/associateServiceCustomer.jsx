const associateServiceCustomer = async (orderDetail) => {

    const id = orderDetail ? orderDetail.company ? orderDetail.company.id : orderDetail.ownService.id : 1;
    
    let url = 'http://localhost:8080/customers/activateServices/'+id;

    let data = {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetail)
    }
    
    try {
        await fetch(url, data)
            .then(response => {
                if(response.ok){
                    return response.json()
                } else {
                    if(response.status===400 || response.status===404){
                    }
                    return response.json()
                }
            })
            .then(data => {
                if(data.exception) {
                    alert("Something wrong: "+ data.message);
                } else {
                    alert("The services were successfully associated!");
                }    
            });        
    } catch (error) {
        console.log("Something wrong. Error: " + error);                        
    }
}

export default associateServiceCustomer;