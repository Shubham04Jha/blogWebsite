import axios from 'axios'

import { Api_notifications, service_url, backEndUrl } from '../constants/config'
import { getAccessToken ,getType } from '../utils/common-utils';

const API_URL = backEndUrl; 

const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "Accept": "application/json" 
    }
})

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
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