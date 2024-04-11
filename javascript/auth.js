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
            // Store the token and user in local storage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));


            setTimeout(() => {
                window.location.href = "/index.html"
            }, 1600);
            showAlert("logged out successfully", "success");

        }).catch((error) => {
            const message = error.response.data.message
            showAlert(message, "error");
        })
}


// Removes the token and user from local storage, logs out the user,
// shows a success message, and sets up the user interface.

const logOut = () => {
    // Remove the token and user from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Show a success message
    showAlert("logged out successfully", "success")
    // Set up the user interface & go to login page
    setTimeout(() => {
        window.location.href = "/pages/login.html"
        setTimeout(() => {
            setupUi()
        }, 1800);
    }, 1600);
}