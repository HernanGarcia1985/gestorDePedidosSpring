const obtainOrder = async (id, setOrder, setLoading) => {

    let url = 'http://localhost:8080/orders/'+id;

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
                    alert("Order with id " + id + " not found");
                } else {
                    setOrder(data)
                }    
            console.log(data)});        
    } catch (error) {
        alert("Order with id " + id + " not found");                       
    }  finally {
        setLoading(false)
    }  
}

export default obtainOrder