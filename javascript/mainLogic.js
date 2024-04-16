const baseUrl = 'https://tarmeezacademy.com/api/v1'

//Set up the user interface based on the user's authentication status.
const setupUi = () => {
    // Get the authentication token from local storage
    const token = localStorage.getItem("token");

    // Get the necessary DOM elements
    const authDiv = document.getElementById("auth-div");
    const logoutDiv = document.getElementById("logout-div");
    // const addBtn = document.getElementById("add-btn");
    const navProfileImageName = document.getElementById("nav-profile-name-image")
    const navUserName = document.getElementById("nav_user_name");
    const navProfileImage = document.getElementById("nav-profile-image");

    // If the token is null, the user is not logged in
    if (token == null) {
        // Show the login div and hide the logout div
        authDiv.style.setProperty("display", "flex", "important");
        logoutDiv.style.setProperty("display", "none", "important");
        navProfileImageName.style.setProperty("display", "none", "important");
    } else {
        authDiv.style.setProperty("display", "none", "important");
        logoutDiv.style.setProperty("display", "flex", "important");
        navProfileImageName.style.setProperty("display", "flex", "important");
    }

   // Get the current user's information
    const user = getCurrentUser()
    navUserName.innerHTML = user.username;
    navProfileImage.src = user.profile_image

}
// Retrieve the current user from local storage
const getCurrentUser = () => {
    let user = null;
    // Check if there is a user stored in local storage
    const storageUser = localStorage.getItem("user");
    if (storageUser != null) {
        // Parse the stored user object
        user = JSON.parse(storageUser);
    }
    // Return the current user
    return user;
}

const showAlert = (customMessage, type = "success") => {
    // Get the placeholder element where the alert will be appended
    const alertPlaceholder = document.getElementById('show-alert');

    // Append the alert to the placeholder element
    const appendAlert = (message, type) => {
        // Create a wrapper element and set its inner HTML
        const wrapper = document.createElement('div');
        wrapper.className = `alert alert-${type}`;
        wrapper.innerHTML = `
            <span class="text-content2 text-xl">${message}</span>
        `;

        // Append the wrapper element to the alert placeholder
        alertPlaceholder.appendChild(wrapper);

        // Make the alert visible
        wrapper.classList.add('show');

        // Schedule the removal of the alert after 2 seconds
        setTimeout(() => {
            // Make the alert hidden
            wrapper.classList.remove('show');

            // Remove the alert from the DOM after animation completes
            setTimeout(() => {
                wrapper.remove();
            }, 500); // Wait for the transition duration before removing
        }, 1000);
    };

    // Append the custom message and type to the alert placeholder
    appendAlert(customMessage, type);
};

//Get the current user ID from the URL parameters.
//The current user ID, or null if not found.
const getCurrentUserID = () => {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Get the user ID from the URL parameters
    const id = urlParams.get("userId");

    // Return the user ID
    return id;
}

//Redirects the user to their profile page
const profileClicked = () => {
    // Get the current user
    const user = getCurrentUser();
    // Get the user ID
    const userId = user.id;
    // Redirect the user to their profile page
    window.location = `/pages/profilePosts.html?userId=${userId}`;
};