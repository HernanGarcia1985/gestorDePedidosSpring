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
                    alert("No Customers found");
                } else {
                    let sortedData = data.sort((x,y) => x.id - y.id)
                    setAllCustomers(sortedData)
                }    
        });        
    } catch (error) {
        alert("No Customers found");                        
    } finally {
        setLoading(false)
    }
   
}

export default obtainAllCustomer