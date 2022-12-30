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
        const response = await fetch(url, data)
            .then(response => response.json())
            .then(data => console.log(data));
        setShowModal(true)

    } catch (error) {
        alert("Bad credentials");                        
    }
}

export default loginUser