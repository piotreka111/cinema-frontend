import axios from 'axios'

const serverAPI = "http://localhost:8080"
const request =  axios.create({
    baseURL: serverAPI,
    withCredentials: true
});

request.interceptors.request.use((config)=>{
    return config;
});

export default request;