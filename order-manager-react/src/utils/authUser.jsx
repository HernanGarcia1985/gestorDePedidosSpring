const loginUser = async (loginUsername, loginPassword, setShowModal) => {

    let url = 'http://localhost:8080/auth/signin';

    let credentials = {
        username: loginUsername,
        password: loginPassword
    }

    let data = {
        method: 'POST',
        //mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(credentials)
    }
    
    try {
        await fetch(url, data)
            .then(response => response.json())
            .then(data => {
                if(data.token){
                    localStorage.setItem('userLogged',JSON.stringify({
                        id: data.id,
                        username: data.username,
                        roles: data.roles,
                        token: data.type + ' ' + data.token 
                    }))
                    setShowModal(true)
                } else if (data.exception){
                    alert(data.message)
                }
                console.log(data)        
            });
        

    } catch (error) {
        alert("Bad credentials");                        
    }
}

export default loginUser