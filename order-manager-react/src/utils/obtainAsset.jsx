const obtainAsset = async (id, setAsset, setLoading) => {

    let url = 'http://localhost:8080/assets/'+id;

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
                    alert("Asset with id " + id + " not found");
                } else {
                    setAsset(data)
                }    
            console.log(data)});        
    } catch (error) {
        alert("Asset with id " + id + " not found");                        
    } finally {
        setLoading(false)
    } 
}

export default obtainAsset