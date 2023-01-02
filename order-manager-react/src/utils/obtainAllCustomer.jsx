const obtainAllCustomer = async (setAllCustomers, setLoading) => {

    let url = 'http://localhost:8080/customers/';

    let data = {
        method: 'GET',
        //mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const result = await fetch(url, data)
            .then(response => response.json())
            .then(data => {
                if(data.exception) {
                    alert("Customer with id "  + " not found");
                } else {
                    setAllCustomers(data)
                }    
            //console.log(data)
        });        
    } catch (error) {
        alert("Customer with id "  + " not found");                        
    } finally {
        setLoading(false)
    }
   
}

export default obtainAllCustomer