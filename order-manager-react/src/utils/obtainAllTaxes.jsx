const obtainAllTaxes = async (setAllTaxes, setLoading) => {

    let url = 'http://localhost:8080/taxes/';

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
                    alert("No Taxes found");
                } else {
                    setAllTaxes(data)
                }    
            console.log(data)});        
    } catch (error) {
        alert("No Taxes found");                        
    }  finally {
        setLoading(false)
    }  
}

export default obtainAllTaxes