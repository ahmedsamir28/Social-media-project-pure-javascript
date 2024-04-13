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

