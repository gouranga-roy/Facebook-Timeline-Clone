// Get dom element
const user_posts = document.getElementById("user_post");
const author_list = document.getElementById("author_list");
const author_list_com = document.getElementById("author_list_com");
const create_post_form = document.getElementById("create_post_form");
const comment_id = document.getElementById("comment_id");
const create_comment_form = document.getElementById("create_comment_form");

// Create new post
create_post_form.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data);

    // Get author data
    const author = users.find((item) => item.id == data.author );

    // Form data send to LS
    const oldData = localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : [];
    
    // Get all media
    let allMedia = [];
    
    if (data.p4) {
        allMedia.push(data.p1);
        allMedia.push(data.p2);
        allMedia.push(data.p3);
        allMedia.push(data.p4);
    } else if (data.p3) {
        allMedia.push(data.p1);
        allMedia.push(data.p2);
        allMedia.push(data.p3);
    } else if (data.p2) {
        allMedia.push(data.p1);
        allMedia.push(data.p2);
    } else {
        allMedia.push(data.p1);
    }

    oldData.push({
        id: createID(),
        author: author.name,
        authoerPhoto: author.photo,
        content: data.content ? data.content : false,
        media: allMedia,
        like: 0,
        comment: [],
        status: true,
        trash: false,
        createAt: Date.now(),
        updateAt: null,
    });
    localStorage.setItem("posts", JSON.stringify(oldData));
    loadAllPosts();
    e.target.reset();
}

// Author list load
let author_list_ui = "";
users.map((item) => {
    author_list_ui += `
        <option value="${item.id}">${item.name}</option>
    `;
});
author_list.innerHTML = author_list_ui;
author_list_com.innerHTML = author_list_ui;

const loadAllPosts = () => {
    // Load user post
    let user_post_ui = "";

    // Get all posts data form ls
    const allPosts = localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : [];

    allPosts.reverse().map((item, index) => {

        // Post Image
        let post_media_ui = "";
        for (let i = 0; i < item.media.length; i++) {
            post_media_ui += `
                <img src="${item.media[i]}" alt="" />
            `;
        };

        // Media ui
        let media_ui = "";
        if (item.media.length > 0) {
            media_ui += `
                <div class="post-media ${item.media.length > 1 ? "media-" + item.media.length : ""}">
                    ${post_media_ui}
                </div>
            `;
        };
        
        // Post comment ui
        let post_comment_ui = "";
        item.comment.map((commentItem) => {
            post_comment_ui += `
                <div class="comments-item">
                    <img
                        src="${commentItem.authoerPhoto}"
                        alt=""
                    />
                    <div>
                        <div class="comments-data">
                            <span class="comments-author">${commentItem.author}</span>
                            <p>${commentItem.content}</p>
                            
                        </div>
                        <span class="comments-time-ago">${timeAgo(commentItem.createAt)}</span>
                    </div>
                </div>
            `;
        });

        user_post_ui += `
            <div class="user-post">
                <div class="user-post-header">
                    <div class="post-info">
                        <img src="${item.authoerPhoto}" alt="" />
                        <div class="user-details">
                        <a class="author" href="#">${item.author}</a>
                        <span
                            >${timeAgo(item.createAt)}
                            <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            width="1em"
                            height="1em"
                            class="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1kpxq89 xsmyaan"
                            title="Shared with Public"
                            >
                            <title>Shared with Public</title>
                            <g fill-rule="evenodd" transform="translate(-448 -544)">
                                <g>
                                <path
                                    d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434"
                                    transform="translate(354 143.5)"
                                ></path>
                                <path
                                    d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096"
                                    transform="translate(354 143.5)"
                                ></path>
                                <path
                                    fill-rule="nonzero"
                                    d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                                    transform="translate(354 143.5)"
                                ></path>
                                </g>
                            </g></svg
                        ></span>
                        </div>
                    </div>
                    </div>
                    <div class="post-body">
                    <div class="post-content">
                        <p>${item.content ? item.content : ''}</p>
                    </div>
                    </div>

                    <!-- SINGLE MEDIA  -->
                    ${media_ui}
                    <div class="post-comments">
                    <div class="comments-header">
                        <div class="reaction">
                        <div class="reaction-icon">
                            <ul>
                            <li>
                                <a href="#">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 16 16"
                                >
                                    <defs>
                                    <linearGradient
                                        id="a"
                                        x1="50%"
                                        x2="50%"
                                        y1="0%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stop-color="#18AFFF" />
                                        <stop offset="100%" stop-color="#0062DF" />
                                    </linearGradient>
                                    <filter
                                        id="c"
                                        width="118.8%"
                                        height="118.8%"
                                        x="-9.4%"
                                        y="-9.4%"
                                        filterUnits="objectBoundingBox"
                                    >
                                        <feGaussianBlur
                                        in="SourceAlpha"
                                        result="shadowBlurInner1"
                                        stdDeviation="1"
                                        />
                                        <feOffset
                                        dy="-1"
                                        in="shadowBlurInner1"
                                        result="shadowOffsetInner1"
                                        />
                                        <feComposite
                                        in="shadowOffsetInner1"
                                        in2="SourceAlpha"
                                        k2="-1"
                                        k3="1"
                                        operator="arithmetic"
                                        result="shadowInnerInner1"
                                        />
                                        <feColorMatrix
                                        in="shadowInnerInner1"
                                        values="0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0"
                                        />
                                    </filter>
                                    <path
                                        id="b"
                                        d="M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z"
                                    />
                                    </defs>
                                    <g fill="none">
                                    <use fill="url(#a)" xlink:href="#b" />
                                    <use
                                        fill="black"
                                        filter="url(#c)"
                                        xlink:href="#b"
                                    />
                                    <path
                                        fill="white"
                                        d="M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z"
                                    />
                                    </g>
                                </svg>
                                </a>
                            </li>
                            </ul>
                        </div>
                        <a href="#"> ${item.like} </a>
                        </div>
                        <div class="counts">
                        <a href="#">95 Comments</a>
                        </div>
                    </div>
                    <div class="divider-0"></div>
                    <div class="comments-menu">
                        <ul>
                        <li onclick="createPostLike('${item.id}');">
                            <span class="comment-icon"></span>
                            <span>Like</span>
                        </li>

                        <li data-bs-toggle="modal" data-bs-target="#create_comment_modal" class="comment_box" onclick="createPostComment('${item.id}');">
                            <span class="comment-icon"></span>
                            <span>Comment</span>
                        </li>

                        <li>
                            <span class="comment-icon"></span>
                            <span>Share</span>
                        </li>
                        </ul>
                    </div>
                    <div class="divider-0"></div>
                    <div class="comments-area">
                        ${post_comment_ui}
                    </div>
                </div>
            </div>
        `;
    });

    user_posts.innerHTML = user_post_ui;
}

loadAllPosts();

// Get post id
const createPostLike = (id) => {
    const oldData = localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : [];
    const postIndex = oldData.findIndex((data) => data.id == id);
    oldData[postIndex].like = oldData[postIndex].like + 1;

    localStorage.setItem("posts", JSON.stringify(oldData));
    
    loadAllPosts();
}

// Create Comment
const createPostComment = (id) => {
    comment_id.value = id;
}

// Create comment form
create_comment_form.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data);

    const comment_author = users.find((item) => item.id == data.author);
    
    const oldData = localStorage.getItem("posts") ? JSON.parse(localStorage.getItem("posts")) : [];
    const postIndex = oldData.findIndex((item) => item.id == data.id);
    
    oldData[postIndex].comment.push({
        id: createID(),
        author: comment_author.name,
        authoerPhoto: comment_author.photo,
        content: data.comment,
        photo: data.photo ? data.photo : null,
        status: true,
        trash: false,
        createAt: Date.now(),
        updateAt: null,
    });

    localStorage.setItem("posts", JSON.stringify(oldData));
    
    loadAllPosts();

    e.target.reset();

};