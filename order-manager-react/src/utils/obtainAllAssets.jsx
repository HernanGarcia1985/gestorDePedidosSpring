const obtainAllAssets = async (setAllAssets, setLoading) => {

    let url = 'http://localhost:8080/assets/';

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
                    alert("Assets not found");
                } else {
                    let sortedData = data.sort((x,y) => x.id - y.id)
                    setAllAssets(sortedData)
                }    
        });        
    } catch (error) {
        alert("Assets not found");                        
    } finally {
        setLoading(false)
    }
   
}

export default obtainAllAssets