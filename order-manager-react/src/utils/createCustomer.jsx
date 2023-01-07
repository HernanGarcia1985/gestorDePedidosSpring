const createCustomer = async (customerType, businessName, startOfActivities, cuit, name, lastName, dni, email, phone, address) => {
    
    console.log (customerType, businessName, startOfActivities, cuit, name, lastName, dni, email, phone, address)
    
    let url = 'http://localhost:8080/customers/';

    let newCustomer = {
        customerType: customerType,
        businessName: businessName,
        startOfActivities: startOfActivities,
        cuit: cuit,
        name: name,
        lastName: lastName,
        dni: dni,
        email: email,
        phone: phone,
        address: address
    }

    let data = {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
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
                    alert("Failed to create a new customer. Error: " + data.exception);
                } else {
                    alert("Customer was created successfully!");
                }    
            });        
    } catch (error) {
        alert("Something went wrong trying to create a new customer. Please try again. Error: "+ error);                        
    }
}

export default createCustomer