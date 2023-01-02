const deleteCustomer = async (id) => {
    
    console.log (id)
    
    let url = 'http://localhost:8080/customers/'+id;

    let data = {
        method: 'DELETE',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        const result = await fetch(url, data)
            .then(response => {
                if(response.ok){
                    alert("Customer with id "+id+" was deleted successfully!");
                } else if(response.status==400 || response.status==404){
                    return response.json()
                } 
                })
            .then(data => {
                if(data && data.exception) {
                    alert(data.message);
                }  
            });        
    } catch (error) {
        alert("An error occurred. Error: " + error);                        
    }
}

export default deleteCustomer