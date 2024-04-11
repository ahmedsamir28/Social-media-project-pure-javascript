//Handles the click event when creating a new post.
function createNewPostClicked() {
    let postId = document.getElementById("post-id-input").value
    let isCreate = postId == null || postId == ""



    const title = document.getElementById("post-title-input").value
    const body = document.getElementById("post-body-input").value
    const image = document.getElementById("post-image-input").files[0]
    const token = localStorage.getItem("token")

    let formData = new FormData()
    formData.append("body", body)
    formData.append("title", title)
    formData.append("image", image)


    let url = ``
    const headers = {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`
    }

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
            
            showAlert("New Post Has Been Created", "success")
            getPosts()

        })
        .catch((error) => {
            const message = error.response.data.message
            showAlert(message, "error")
        })

}