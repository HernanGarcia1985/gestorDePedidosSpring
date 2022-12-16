const createUser = async (registerEmail, registerUsername, registerPassword, setShowModal) => {

    let url = 'http://localhost:8080/auth/signup';

    let newUser = {
        email: registerEmail,
        username: registerUsername,
        password: registerPassword
    }

    let data = {
        method: 'POST',
        //mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(newUser)
    }

    try {
        const response = await fetch(url, data)
            .then(response => response.json())
            .then(data => console.log(data));
        setShowModal(true)

    } catch (error) {
        alert("Something went wrong, please check the data entered and try to register again");                 
      

    console.log(data)
    }
}

export default createUser