const updateCustomer = async (id, customerType, businessName, startOfActivities, cuit, name, lastName, dni, email, phone, address, updatePersonInCharge) => {
    
    console.log (id, customerType, businessName, startOfActivities, cuit, name, lastName, dni, email, phone, address, updatePersonInCharge)
    
    let url = 'http://localhost:8080/customers/'+id;

    let customerModified = {
        customerType: customerType,
        businessName: businessName,
        startOfActivities: startOfActivities,
        cuit: cuit,
        name: name,
        lastName: lastName,
        dni: dni,
        email: email,
        phone: phone,
        address: address,
        updatePersonInCharge: updatePersonInCharge
    }

    let data = {
        method: 'PUT',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerModified)
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
                    alert("Something wrong Customer with id " + id + " not found");
                } else {
                    alert("Customer with id "+id+" was updated successfully!");
                }    
            });        
    } catch (error) {
        alert("Customer with id " + id + " not found. Error: " + error);                        
    }
}

export default updateCustomer