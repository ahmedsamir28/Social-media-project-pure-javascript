
const posts = document.getElementById("posts")

let currentPage = 1
let lastPage = 1

//Function to handle pagination when scrolling to the end of the page
const pagination = () => {
    // Add scroll event listener to the window
    window.addEventListener("scroll", () => {
        // Check if scrolled to the end of the page
        const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight

        // Check if there are more pages to load
        if (endOfPage && currentPage < lastPage) {
            // Increment the current page number
            currentPage = currentPage + 1

            // Call the getData function to fetch data for the next page
            getDataPosts(false, currentPage)
        }
    })
}

pagination()

//Fetches data from the API and renders the posts on the page.
const getDataPosts = (reload = true, page = 1) => {
    const url = `${baseUrl}/posts?limit=5&page=${page}`;
    // Fetch data from the API
    fetch(url)
        .then(res => res.json())
        .then(res => {
            const response = res.data;

            lastPage = res.meta.last_page;

            if (reload) {
                posts.innerHTML = '';
            }

            // Render each post
            response.forEach(post => {
                getPosts(post);
            });
        })
        .catch(err => console.log(err));

    //Renders a single post on the page.
    const getPosts = (post) => {
        const author = post.author;
        let user = getCurrentUser()
        let isMyPost = user != null && post.author.id == user.id;
        let editBtnContent = '';
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
        
            `;
        }
        let content = `
    <div class=" rounded-lg shadow-lg p-8 max-w-xl w-full bg-backgroundSecondary">
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
        <a href="/pages/userPost.html">
            <img src=${post.image}  alt="Coffee" class="mt-4 rounded-lg" />
        </a>
        <!-- Post Actions -->
        <label class="flex items-center mt-4 border-t border-zinc-400 pt-2 cursor-pointer"
            for="modal-2">
            <!-- You can add like, comment, and share buttons here -->
            <span class='pt-2'> <i class="text-zinc-400 fa-regular fa-pen-to-square"></i> <span
                    class='text-gray-600'>(${post.comments_count}) comments</span> </span>
        </label>
    </div>
`;


        posts.innerHTML += content;
    }
}

getDataPosts()

//Fetches data from the API and renders the posts on the page.
const getDataUsers = () => {
    const url = `${baseUrl}/users`;
    // Fetch data from the API
    fetch(url)
        .then(res => res.json())
        .then(res => {
            const response = res.data;
            // Render each post
            response.slice(0, 9).forEach(post => {
                getUsers(post);
            });
        })
        .catch(err => console.log(err));

    //Renders a single post on the page.
    const getUsers = (user) => {
        const users = document.getElementById("users")


        let content = `
            <div>
                <a href="/pages/profilePosts.html" class="flex items-center justify-between cursor-pointer">
                    <div class="flex items-center">
                        <img src=${user.profile_image} alt="Profile Picture"
                            class="rounded-full w-12 h-12 mr-4" />
                        <h6>${user.name}</h6>
                    </div>
                    <div class="item"><i class="fa-solid fa-angles-right text-sm"></i></div>
                </a>
            </div>
        `;

        users.innerHTML += content;
    }
}

getDataUsers()
setupUi()

const leftSideBarInformation = () => {
    const leftSideBar = document.getElementById("left-side-bar")

    const user = getCurrentUser()

    let content = `
        <div class='rounded-t-lg bg-border h-28 relative'>
                <img src=${user.profile_image} alt="Profile Picture"
                    class="absolute left-24 top-20 rounded-full w-16 h-16 p-1 bg-zinc-200" />
            </div>
            <h6 class='capitalize text-md text-center mt-10 font-light'>${user.username}</h6>
            <h6 class='text-md text-center mt-1.5 font-thin '>${user.email}</h6>
            <div class='flex flex-col capitalize items-center mt-3 border-t border-gray-500 pt-2 text-md'>
                posts
                <span class='text-sm  font-light'>${user.posts_count}</span>
            </div>
            <div class='flex flex-col capitalize items-center mt-3  border-t border-gray-500 pt-2 text-md'>
                comments
                <span class='text-sm font-light'>${user.comments_count}</span>
            </div>
            <div
                class='capitalize text-center my-3 text-blue-600 border-t border-gray-500 py-3 text-sm cursor-pointer'>
                <a href="/pages/profilePosts.html"> view profile </a>

        </div>
`;

    leftSideBar.innerHTML += content;

}

leftSideBarInformation()


