import axios from 'axios'
import { isTokenExpired, getAccessToken, refreshAccessToken,getType, clearTokens} from '../utils/common-utils';

import { Api_notifications, service_url, backEndUrl } from '../constants/config'

// import { useNavigate } from 'react-router-dom';

const API_URL = backEndUrl; 

const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "Accept": "application/json" 
    }
})

axiosInstance.interceptors.request.use(
    async(config)=>{
        let accessToken = getAccessToken();  // commented the whole thing as it was not getting anywhere cuz of this. maybe this getAccessToken was giving the actual access token and I was splitting it...

        // // If the token is expired, try to refresh it
        // console.log('before token');
        // console.log(accessToken);
        if (isTokenExpired(accessToken)) {
            // console.log('Access token expired, refreshing...');
            accessToken = await refreshAccessToken();  // Refresh the token

            if (!accessToken) {
                // todo major
                if (window.location.pathname !== '/login') {
                    window.location.pathname = '/login'; // Full page redirect to login
                    clearTokens();
                }// this will avoid refreshing twice when the login in.
                // this means that refreshToken is invalid or server error is there. I should use  or may be when it logins it should not search for tokens.
                // const navigate = useNavigate();
                // navigate('/login')
            }
            // Update the config with the new access token
            // setAccessToken(accessToken);  // Store the new token
        }

        // // Attach the access token to the request
        // if (accessToken) {
        //     config.headers['Authorization'] = `Bearer ${accessToken}`;
        // }

        if (config.TYPE?.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE?.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//2 functions... for success and for failure.
axiosInstance.interceptors.response.use(
    (response)=>{
        return processResponse(response);
    },
    (error)=>{
        return Promise.reject(processError(error));
    }
)
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isFailure: true, status: string, msg: string, code: int }
const processResponse = (response)=>{
    if (response?.status >= 200 && response?.status < 300) {
        return { isSuccess: true, data: response.data }
    }else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response.data.msg || 'An error occurred',
            code: response.status
        }
    }
}
const processError = (error)=>{
    const obj = {isError:true,title:'',msg:'',code:''};
    if(error.response){
        obj.code = error.response.status;
        obj.msg = error.response.data.msg;
        obj.title = 'Error'
    }else if(error.request){
        obj.msg = Api_notifications.requestFailure.message;
        obj.title = Api_notifications.requestFailure.title;
    }else{
        obj.msg= Api_notifications.networkError.message;
        obj.title= Api_notifications.networkError.title;
    }
    return obj;
}

const API = {};

//axios instance, a function, needs an object

for(const [key,value] of Object.entries(service_url)){
    API[key] = (body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers:{
                authorization:getAccessToken(),
            },
            TYPE:getType(value,body),
            onUploadProgress: (progressEvent)=>{
                if(showUploadProgress){
                    let percentComplete = Math.round((progressEvent.loaded*100)/progressEvent.total);
                    showUploadProgress(percentComplete);
                }
            },
            onDownloadProgress:(progressEvent)=>{
                if(showDownloadProgress){
                    let percentComplete = Math.round((progressEvent.loaded*100)/progressEvent.total);
                    showDownloadProgress(percentComplete);
                }
            }
        })
}

export default API;