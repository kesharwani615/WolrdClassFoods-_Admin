import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`
});


const login = (rowData) => API.post("/user/login", rowData); 
const logout = (rowData) => API.post("/user/logout",rowData);

// roles opreations
const fetchRoles = () => API.get("/role/get-roles");
const addRole = (rowData) => API.post("/role/register",rowData);
const updateRole = (rowData) => API.patch(`/role/update/${rowData.id}`,rowData);
const deleteRole = (rowData) => API.delete(`/role/delete/${rowData.id}`);
const getRole = (id) => API.get(`/role/get-role/${id}`);


export {
  API,
    login,
    logout,
    fetchRoles,
    addRole,
    updateRole,
    deleteRole,
    getRole
}


