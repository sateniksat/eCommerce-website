
import axios from "axios";
const urlOfPage="http://localhost:3000"
const Axios = axios.create();
Axios.defaults.baseURL = "http://localhost:3002";
export function serAuthorizationToken(token){
    if(token){
        axios.defaults.headers.common['Authorization']=`${token}`
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}
export { Axios };