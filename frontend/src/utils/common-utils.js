import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';  // very crude way of doing it... no error handling done here... it should but to do...
axios.defaults.timeout = 10000;

export const clearTokens = () => {
    // Remove access token and refresh token from localStorage
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    
    // console.log('Tokens have been cleared');
};


export const getAccessToken=()=>{
    const data = sessionStorage.getItem('accessToken');
    if(!data) return null;
    return data.split(' ')[1];
}

export const getRefreshToken = () => {
    const data = sessionStorage.getItem('refreshToken');
    if(!data) return null;
    return data.split(' ')[1];
}

export const setAccessToken = (accessToken) => {
    sessionStorage.setItem('accessToken', `Bearer ${accessToken}`);
}

export const setRefreshToken = (refreshToken) => {
    sessionStorage.setItem('refreshToken', `Bearer ${refreshToken}`);
}

export const isTokenExpired=(token)=>{
    if (!token) return true;

    // Decode the JWT payload (second part of the token)
    const decoded = JSON.parse(atob(token.split('.')[1]));  // Decode the base64-encoded payload

    const currentTime = Math.floor(Date.now() / 1000);  // Get current time in seconds
    const bufferPeriod = 5 * 60;  // Add a buffer period (e.g., 5 minutes) 

    // Check if the token has expired (considering the buffer period)
    return decoded.exp < currentTime + bufferPeriod;
}

export const getType = (value, body) => {
    if (value.params) {
        return { params: body }
    } else if (value.query) {
        if (typeof body === 'object') {
            return { query: body._id }
        } else {
            return { query: body }
        }
    }
    return {};
}

// Refresh the access token
export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken(); // Get the refresh token
    if (!refreshToken) {
        return null;
    }

    try {
        const response = await axios.post('/refreshTokens', { token: refreshToken }); // doubtful no its not u specify the baseurl and all above so its a basic version of api.js
        // console.log('what we received');
        // console.log(response.data.accessToken);
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken) // Store the new access token
        return newAccessToken;
    } catch (error) {
        // console.log('Unable to refresh access token', error);
        return null;
    }
};


export const validatePost=(user)=>{
    if(!user){
        return false;
    }
    
}