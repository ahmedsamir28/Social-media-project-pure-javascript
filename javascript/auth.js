const baseUrl = 'https://tarmeezacademy.com/api/v1'

//Handle the click event of the login button.
const loginBtnClicked = () => {
    // Get the username and password from input fields
    const userName = document.getElementById("username-input").value;
    const password = document.getElementById("password-input").value;


    // Prepare the parameters for the POST request
    const params = {
        "username": userName,
        "password": password
    };

    // Send the POST request to the login API
    const url = `${baseUrl}/login`;
    axios.post(url, params)
        .then((res) => {
            console.log(res.data);
             // Store the token and user in local storage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

        }).catch((error) => {
            console.log(error.response.data); 
        })
}


