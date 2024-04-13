// const baseUrl = 'https://tarmeezacademy.com/api/v1'

//Redirects the user to the post details page
const postClicked = (postId) => {
    // Construct the URL with the postId parameter
    const url = `/pages/post-details.html?postId=${postId}`;
    // Redirect the user to the post details page
    window.location = url;
};

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("postId")

const getPostDetails = () => {

    // Fetch the post details from the API
    axios.get(`${baseUrl}/posts/${id}`)
        .then(res => {
            const post = res.data.data;
            const comments = post.comments;
            const author = post.author;

            document.getElementById("post-details").innerHTML = '';

            // Generate the HTML for the post details
            let postContent = `
            <div class="bg-backgroundSecondary rounded-lg shadow-lg max-w-xl w-full p-8">
            <!-- Post Header -->
            <div class="flex items-center">
                <img src=${author.profile_image} alt="Profile Picture" class="rounded-full w-12 h-12 mr-4" />
                <div class=''>
                    <h2 class="font-semibold text-lg">${author.username}</h2>
                    <p class="text-gray-600">${post.created_at}</p>
                </div>
            </div>
            <!-- Post Content -->
            <p class="text-sm mt-4">
                ${post.body}
            </p>
            <!-- Post Image -->
            <img src=${post.image}  alt="Coffee" class="mt-4 rounded-lg" />
            <!-- Post Actions -->
            <hr />
            <div class="flex flex-col items-start mt-5 border-y border-zinc-400 pt-1 pb-2">
                <!-- You can add like, comment, and share buttons here -->
                <span class='pt-2 '> <i class="text-zinc-400 fa-regular fa-pen-to-square"></i> <span class='text-gray-600'>(${post.comments_count}) comments</span> </span>
            </div>
    
            <div class=''>
                <div class=' border-b-2 border-zinc-400 py-5'>
                    <div class="flex items-center">
                        <img src="https://via.placeholder.com/50" alt="Profile Picture" class="rounded-full w-10 h-10 mr-4" />
                        <div class=''>
                            <h2 class="font-semibold text-lg">John Doe</h2>
                        </div>
                    </div>
                    <!-- Post Content -->
                    <p class="text-sm mt-2">
                        Just enjoying a cup of coffee ☕️ Just enjoying a cup of coffee
                    </p>
                </div>
            </div>
    
            <div class='flex items-center justify-between gap-5 mt-5'>
                <input class="w-full outline-none py-1.5 rounded-lg pl-5 bg-first-color border-2 border-zinc-500 placeholder:text-zinc-500" placeholder="Add your comment" />
                <button class='btn-primary py-2 px-3 rounded-lg'>Add</button>
            </div>
        </div>
            `;

            // Render the post details on the page
            document.getElementById("post-details").innerHTML = postContent;
        })
        .catch(error => {
            console.log(error);
        });
}

getPostDetails()
setupUi()
