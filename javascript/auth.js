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
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error.response.data); 
        })
}
