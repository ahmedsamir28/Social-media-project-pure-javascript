//Handles the click event when creating a new post.
function createNewPostClicked() {
    // Initialize variables
    const token = localStorage.getItem("token")
    let url = ``
    // Get the post ID input value
    let postId = document.getElementById("post-id-input").value
    // Check if creating a new post or updating an existing one
    let isCreate = postId == null || postId == ""


    // Get values from input fields
    const title = document.getElementById("post-title-input").value
    const body = document.getElementById("post-body-input").value
    const image = document.getElementById("post-image-input").files[0]



    // Create form data
    let formData = new FormData()
    formData.append("body", body)
    formData.append("title", title)
    formData.append("image", image)

    // Set request options
    const headers = {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`
    }

    // Determine the URL based on whether it's a create or update request
    if (isCreate) {
        url = `${baseUrl}/posts`

    } else {
        formData.append("_method", "put")
        url = `${baseUrl}/posts/${postId}`
    }

    axios.post(url, formData, {
        headers: headers
    })
        .then((res) => {
            location.reload()
        })
        .catch((error) => {
            const message = error.response.data.message
            showAlert(message, "error")
        })
}

const editPostClicked = (postObject) => {
    // Parse the JSON string to get the post object
    let post = JSON.parse(decodeURIComponent(postObject));
    // Update the submit button text
    document.getElementById("post-modal-submit-btn").innerHTML = "Update";

    // Set the post id input value
    document.getElementById("post-id-input").value = post.id;

    // Update the post modal title
    document.getElementById("post-model-title").innerHTML = "Edit Post";

    // Set the post title input value
    document.getElementById("post-title-input").value = post.title;

    // Set the post body input value
    document.getElementById("post-body-input").value = post.body;
}

//Deletes a post from the server and performs additional actions.
const confirmPostDelete = () => {
    const token = localStorage.getItem("token")
    const postId = document.getElementById("delete-post-id-input").value

    const url = `${baseUrl}/posts/${postId}`
    const headers = {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`
    }

    axios.delete(url, {
        headers: headers
    })
        .then((res) => {
            location.reload()
        }).catch((error) => {
        })
}

//Function to handle the delete post edit event
const deletePostBtnClicked = (postObject) => {
    // Decode the post object string
    let post = JSON.parse(decodeURIComponent(postObject))
    // Set the value of the delete post id input field
    document.getElementById("delete-post-id-input").value = post.id
}

//Handles the event when the create comment button is clicked.
const createCommentClicked = () => {
    // Get the comment body from the input field
    let commentBody = document.getElementById("comment-input").value;
    // Get the token from local storage
    let token = localStorage.getItem("token");
    // Set the URL for the API endpoint
    let url = `${baseUrl}/posts/${id}/comments`;
    // Set the parameters for the API request
    const params = {
        body: commentBody,
    };
    // Set the request options for the API request
    const requestOptions = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    // Send the API request to create a comment
    axios.post(url, params, requestOptions)
        .then(res => {
            // Refresh the post details after creating the comment
            getPostDetails();
        })
        .catch(error => {
        });

}