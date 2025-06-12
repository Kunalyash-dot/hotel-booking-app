import axios from 'axios'

 const baseUrl = import.meta.env.VITE_API_URL

 const Axios = axios.create({
    baseURL:baseUrl,
    withCredentials:true
 })

 Axios.interceptors.request.use(
    async(config)=>{
        const token = localStorage.getItem('accessToken');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, (error)=>{
        return Promise.reject(error);
    }
 );

 Axios.interceptors.response.use(
    (response) => response,
    (error)=> {
        if(error.response && error.response.status === 401){
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
 );


 export default Axios;

