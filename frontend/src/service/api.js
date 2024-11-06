import axios from 'axios'

import { Api_notifications, service_url, frontEndURL } from '../constants/config'

const API_URL = frontEndURL; 

const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        'content-type': 'application/json'
    }
})

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
    if (response?.status === 200) {
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

//axios instance needs an object

for(const [key,value] of Object.entries(service_url)){
    API[key] = (body,showUploadProgress,showDownloadProgress)=>
        axiosInstance({
            method:value.method,
            url:value.url,
            data:body,
            responseType: value.responseType,
            onUploadProgress: (progresEvent)=>{
                if(showUploadProgress){
                    let percentComplete = Math.round((ProgressEvent.loaded*100)/progresEvent.total);
                    showUploadProgress(percentComplete);
                }
            },
            onDownloadProgress:(progresEvent)=>{
                if(showDownloadProgress){
                    let percentComplete = Math.round((ProgressEvent.loaded*100)/progresEvent.total);
                    showDownloadProgress(percentComplete);
                }
            }
        })
}

export default API;