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



//product routes
const fetchAllProducts = (search) => {
  let url = `/product/get-all-products`;
  if(search) url+=`?search=${search}`
  return API.get(url);
};
const addProduct = (formData) => API.post("/product/register",formData);
const updateproduct = ({_id,...restFormData}) => {
  const formData = createFormData(restFormData);
  return API.patch(`/product/update/${_id}`,formData);
};
const fetchProductById = (rowData) => API.get(`/product/get-product/${rowData?._id}`);
const deleteProduct = (rowData) => API.delete(`/product/delete/${rowData?._id}`,rowData);

//dashboard route
const fetchDashboard = () => API.get("/user/dashboard"); 

//users route
const fetchUsers = () => API.get("/user/all-users"); 
const updateUserStatus = ({_id,...formData}) => {
  return API.patch(`/user/update-status/${_id}`,formData);
};
const deleteUser = (rowData) => API.delete(`/user/delete/${rowData?._id}`,rowData);
const changePasswordUser = (rowData) => API.post(`/user/change-password`,rowData);






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
    fetchSubCategoryById,
    fetchAllProducts,
    addProduct,
    updateproduct,
    deleteProduct,
    fetchProductById,
    fetchDashboard,
    fetchUsers,
    updateUserStatus,
    deleteUser,
    changePasswordUser
}


