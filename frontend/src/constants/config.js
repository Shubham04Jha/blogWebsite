

export const backEndUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const Api_notifications = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded. Please wait"
    },
    success: {
        title: "Success",
        message: "Data successfully loaded"
    },
    requestFailure: {
        title: "Error!",
        message: "An error occur while parsing request data"
    },
    responseFailure: {
        title: "Error!",
        message: "An error occur while fetching response from server. Please try again"
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
}

// {url:'/*', method:POST/GET/PUT/DELETE, params:true/false, query:true/false }
export const service_url = {
    userSignup:{url:'/signup',method:'POST'},
    userLogin:{url:'/login',method:'POST'},
    userLogOut:{url:'/logout',method:'POST'},
    // refreshToken:{url:'/refreshTokens',method:'POST'}, // cuurently no point of having this.
    
    fileUpload:{url:'/file/upload', method:'POST'},
    createPost:{url:'/createPost', method:'POST'},
    getAllPosts: {url:'/posts',method:'GET', params:true},
    getPostById: {url:'/post' ,method:'GET',query:true},
    updatePost: { url: '/update', method: 'PUT', query: true },
    deletePost: { url: '/delete', method: 'DELETE', query: true },
    fileDelete:{url:'/file/delete',method:'DELETE', query:true},

    createComment:{url:'/comments/add',method:'POST'},
    getComments:{url:'/comments/get',method:'GET', query:true},
    deleteComment:{url:'/comments/delete',method:'DELETE', query: true }
}