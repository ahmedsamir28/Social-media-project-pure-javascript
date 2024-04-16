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
            <div class="flex items-center">
                <img src="https://via.placeholder.com/50" alt="Profile Picture" class="rounded-full w-12 h-12 mr-4" />
                <div class=''>
                    <h2 class="font-semibold text-lg">John Doe</h2>
                    <p class="text-gray-600">March 26 at 10:00 AM</p>
                </div>
            </div>
            <p class="text-sm mt-4">
                Just enjoying a cup of coffee ☕️ Just enjoying a cup of coffee ☕️ Just enjoying a cup of coffee ☕️ Just enjoying a cup of coffee ☕️ Just enjoying a cup of coffee ☕️
            </p>
            <img src="https://via.placeholder.com/500" alt="Coffee" class="mt-4 rounded-lg" />
            <div class="flex items-center mt-4 border-t border-zinc-400 pt-2">
                <span class='pt-2'> <i class="text-zinc-400 fa-regular fa-pen-to-square"></i> <span class='text-gray-600'>(5) comments</span> </span>
            </div>
        </div>
    </div>
        `
        userPosts.innerHTML += content

    }
}

getProfilePosts()
setupUi()
