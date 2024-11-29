import axios from "axios";

axios.defaults.baseURL = "https://react-test-app-gj-0a2d12296e7e.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();