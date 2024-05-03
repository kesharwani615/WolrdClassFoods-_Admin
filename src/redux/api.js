import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`
});


const login = (rowData) => API.post("/user/login", rowData); 
const logout = (rowData) => API.post("/user/logout",rowData); 


export {
  API,
    login,
    logout
}


