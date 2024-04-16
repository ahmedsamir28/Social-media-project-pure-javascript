//Redirects the user to the profile page of the specified user ID.
//The ID of the user.
const userClicked = (userId) => {
    // Generate the URL for the profile page using the user ID
    const url = `/pages/profilePosts.html?userId=${userId}`;
    // Redirect the user to the profile page
    window.location = url;
}

//Retrieves the profile posts for the current user.
const getProfilePosts = () => {
    const id = getCurrentUserID()

    let userNamePosts = document.getElementById("user-name-posts")
    let userPosts = document.getElementById("user-posts")

    axios.get(`${baseUrl}/users/${id}/posts`)
        .then((res) => {
            const posts = res.data.data
            userPosts.innerHTML = ``
            posts.forEach(post => {
                getPosts(post)
            });
        })

    //Generates a function comment for the given function body.
    const getPosts = (post) => {
        const author = post.author
        let user = getCurrentUser()
        let isMyPost = user != null && post.author.id == user.id
        let editBtnContent = ``
        if (isMyPost) {
            editBtnContent = `
                <div class="flex items-center gap-5">

                    <label class="btn" for="modal-1" onclick="editPostClicked('${encodeURIComponent(JSON.stringify(post))}')">
                        <i class="fa-regular fa-pen-to-square cursor-pointer" ></i>
                    </label>

                    <label class="btn" for="modal-3" onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">
                        <i class="fa-regular fa-rectangle-xmark cursor-pointer"></i>
                    </label>
                </div>
        `
        }


        let content = `
            <div class="bg-backgroundSecondary rounded-lg">
                <div class="bg-first-color rounded-lg shadow-lg p-8 max-w-xl w-full">
                    <!-- Post Header -->
                        <div>
                            <div class="flex items-start justify-between" >
                                <div class="flex items-center">
                                    <a href="/pages/profilePosts.html">
                                        <img src=${author.profile_image}  alt="Profile Picture"
                                            class="rounded-full w-12 h-12 mr-4 border" />
                                    </a>
                                    <div class=''>
                                        <h2 class="font-semibold text-lg ">${author.username}</h2>
                                        <p class="text-gray-600">${post.created_at}</p>
                                    </div>
                                </div>
                                ${editBtnContent}
                            </div>
                        </div>

                    <!-- Post Content -->
                    <p class="text-sm mt-4">
                    ${post.body}
                    </p>
                    <!-- Post Image -->
                    <img src=${post.image} alt="Coffee" class="mt-4 rounded-lg" />
                    <!-- Post Actions -->
                    <div class="flex items-center mt-4 border-t border-zinc-400 pt-2">
                        <!-- You can add like, comment, and share buttons here -->
                        <span class='pt-2'> <i class="text-zinc-400 fa-regular fa-pen-to-square"></i> 
                            <span class='text-gray-600'>(${post.comments_count}) comments</span> 
                        </span>
                    </div>

                </div>
            </div>
        `
        userPosts.innerHTML += content

    }
}

getProfilePosts()
setupUi()


// Fetches user data from the API and updates the UI with the retrieved information
const getUser = () => {
    const id = getCurrentUserID();
    axios.get(`${baseUrl}/users/${id}`)
        .then(res => {
            const user = res.data.data;
            // Update user information in the UI
            document.getElementById("user-name-posts").innerHTML = user.username + ' " posts "';

            document.getElementById("user-email").innerHTML = user.email;
            document.getElementById("user-name").innerHTML = user.name;
            document.getElementById("user-image").src = user.profile_image;
            document.getElementById("user-post-count").innerHTML = user.posts_count;
            document.getElementById("user-comments-count").innerHTML = user.comments_count;
        })
    }
getUser()