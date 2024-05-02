import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`
});


const login = (rowData) => API.post("/user/login", rowData); 


export {
    login
}


export default {
  LOGIN:"login"
}