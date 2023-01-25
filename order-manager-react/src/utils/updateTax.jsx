const updateTax = async (id, name, percentage) => {
    
    console.log (id, name, percentage)
    
    let url = 'http://localhost:8080/taxes/'+id;

    let taxModified = {
        name: name,
        percentage: percentage
    }

    let data = {
        method: 'PUT',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taxModified)
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
                    alert("Something wrong Tax with id " + id + " not found");
                } else {
                    alert("Tax with id "+id+" was updated successfully!");
                }    
            });        
    } catch (error) {
        alert("Tax with id " + id + " not found. Error: " + error);                        
    }
}

export default updateTax