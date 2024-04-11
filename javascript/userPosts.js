//Handles the click event when creating a new post.
function createNewPostClicked() {
    // Get the post ID input value
    // let postId = document.getElementById("post-id-input").value
    // Check if creating a new post or updating an existing one
    // let isCreate = postId == null || postId == ""


    // Get values from input fields
    const title = document.getElementById("post-title-input").value
    const body = document.getElementById("post-body-input").value
    const image = document.getElementById("post-image-input").files[0]

    // Initialize variables
    const token = localStorage.getItem("token")
    let url = ``

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
    // if (isCreate) {
    //     url = `${baseUrl}/posts`

    // } else {

    //     formData.append("_method", "put")
    //     url = `${baseUrl}/posts/${postId}`
    // }


    url = `${baseUrl}/posts`
    axios.post(url, formData, {
        headers: headers
    })
        .then((res) => {
            console.log(res);
            showAlert("New Post Has Been Created", "success")
// getDataPosts()
        })
        .catch((error) => {
            const message = error.response.data.message
            showAlert(message, "error")
        })

}