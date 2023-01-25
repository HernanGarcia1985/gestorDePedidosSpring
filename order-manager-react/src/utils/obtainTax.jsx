const obtainTax = async (id, setTax, setLoading) => {

    let url = 'http://localhost:8080/taxes/'+id;

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
                    alert("Tax with id " + id + " not found");
                } else {
                    setTax(data)
                }    
            console.log(data)});        
    } catch (error) {
        alert("Tax with id " + id + " not found");                        
    }  finally {
        setLoading(false)
    }  
}

export default obtainTax