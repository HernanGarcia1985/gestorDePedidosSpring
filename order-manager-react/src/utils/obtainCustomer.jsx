const obtainCustomer = async (id, setCustomer, setLoading) => {

    let url = 'http://localhost:8080/customers/'+id;

    let data = {
        method: 'GET',
        //mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        await fetch(url, data)
            .then(response => response.json())
            .then(data => {
                if(data.exception) {
                    alert("Customer with id " + id + " not found");
                } else {
                    setCustomer(data)
                }    
            console.log(data)});        
    } catch (error) {
        alert("Customer with id " + id + " not found");                        
    } finally {
        setLoading(false)
    } 
}

export default obtainCustomer