//Redirects the user to the post details page
const postClicked = (postId) => {
    // Construct the URL with the postId parameter
    const url = `postDetails.html?postId=${postId}`;
    // Redirect the user to the post details page
    window.location = url;
};