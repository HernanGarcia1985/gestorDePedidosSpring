const deleteTax = async (id) => {
    
    console.log (id)
    
    let url = 'http://localhost:8080/taxes/'+id;

    let data = {
        method: 'DELETE',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    try {
        await fetch(url, data)
            .then(response => {
                if(response.ok){
                    alert("Tax with id "+id+" was deleted successfully!");
                } else if(response.status===400 || response.status===404){
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

export default deleteTax