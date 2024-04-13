//Handle the click event of the register button
const registerBtnClicked = () => {
    // Get the input values from the register form
    const registerImage = document.getElementById("register-image").files[0];
    const registerName = document.getElementById("register-name").value;
    const registerUserName = document.getElementById("register-username").value;
    const registerEmail = document.getElementById("register-email").value;
    const registerPassword = document.getElementById("register-password").value;

    // Create a new FormData object and append the input values to it
    let formData = new FormData()
    formData.append("name", registerName)
    formData.append("username", registerUserName)
    formData.append("email", registerEmail)
    formData.append("password", registerPassword)
    formData.append("image", registerImage)

    const headers = {
        "Content-Type": "multipart/form-data",
    }

    // Construct the URL for the register API endpoint
    const url = `${baseUrl}/register`

    axios.post(url, formData, {
        headers: headers
    })
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