import axios from "axios";
import { createFormData } from "../utils";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`
});


const login = (rowData) => API.post("/user/login", rowData); 
const logout = (rowData) => API.post("/user/logout",rowData);

// roles opreations
const fetchRoles = () => API.get("/role/get-roles");
const addRole = (rowData) => API.post("/role/register",rowData);
const updateRole = (rowData) => API.patch(`/role/update/${rowData?._id}`,rowData);
const deleteRole = (rowData) => API.delete(`/role/delete/${rowData?._id}`);
const getRole = (id) => API.get(`/role/get-role/${_id}`);

//Product Category
const addCategory = (formData) => API.post("/category/register",formData);
const fetchAllCategory = (search) => {
  let url = `/category/get-categories`;
  if(search) url+=`?search=${search}`
  return API.get(url);
};
const updateCategory = ({_id,...restFormData}) => {
  const formData = createFormData(restFormData);
  return API.patch(`/category/update/${_id}`,formData);
}



//contact
const fetchContact=(search)=>{
  let url = `/contact/get-all-contacts`;
  if(search) url+=`?search=${search}`
  return API.get(url);
}


export {
  API,
    login,
    logout,
    fetchRoles,
    addRole,
    updateRole,
    deleteRole,
    getRole,
    addCategory,
    fetchAllCategory,
    updateCategory,
    fetchContact
}


