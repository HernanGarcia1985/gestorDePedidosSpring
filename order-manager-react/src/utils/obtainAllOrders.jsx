const obtainAllOrders = async (setAllOrders, setLoading) => {

    let url = 'http://localhost:8080/orders/';

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
                    alert("No Orders found");
                } else {
                    setAllOrders(data)
                }    
            console.log(data)});        
    } catch (error) {
        alert("No Orders found");                        
    }  finally {
        setLoading(false)
    }  
}

export default obtainAllOrders