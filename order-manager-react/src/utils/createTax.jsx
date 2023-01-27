const createTax = async (name, percentage) => {
    
    
    let url = 'http://localhost:8080/taxes/';

    let newTax = {
        name: name,
        percentage: percentage
    }

    let data = {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTax)
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
                    alert("Failed to create a new tax. Error: " + data.exception);
                } else {
                    alert("Tax was created successfully!");
                }    
            });        
    } catch (error) {
        alert("Something went wrong trying to create a new tax. Please try again. Error: "+ error);                        
    }
}

export default createTax