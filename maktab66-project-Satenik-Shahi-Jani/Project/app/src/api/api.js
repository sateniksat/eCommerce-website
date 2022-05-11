import axios from "axios";

const Axios = axios.create();
Axios.defaults.baseURL = "http://localhost:3002";
// export { Axios };