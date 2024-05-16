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
};
const deleteCategory = (rowData) => API.delete(`/category/delete/${rowData?._id}`,rowData);



//contact
const fetchContact=(search)=>{
  let url = `/contact/get-all-contacts`;
  if(search) url+=`?search=${search}`
  return API.get(url);
}
const fetchContactById = (rowData) => API.get(`/contact/get-contact/${rowData?._id}`);


//product sub categories routes
const fetchAllSubCategory = (search) => {
  let url = `/sub_category/get-sub-categories`;
  if(search) url+=`?search=${search}`
  return API.get(url);
};
const addSubCategory = (formData) => API.post("/sub_category/register",formData);
const updateSubCategory = ({_id,...restFormData}) => {
  const formData = createFormData(restFormData);
  return API.patch(`/sub_category/update/${_id}`,formData);
};
const deleteSubCategory = (rowData) => API.delete(`/sub_category/delete/${rowData?._id}`,rowData);
const fetchSubCategoryById = (rowData) => API.get(`/sub_category/get-sub-category/${rowData?._id}`);


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
    deleteCategory,
    fetchContact,
    fetchContactById,
    fetchAllSubCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    fetchSubCategoryById
}


