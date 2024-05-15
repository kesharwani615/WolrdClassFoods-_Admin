import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRoleApiResponse, deleteRoleApiResponse, addCategoryApiResponse, fetchCategoryApiResponse, updateCategoryApiResponse, deleteCategoryApiResponse, fetchSubCategoryApiResponse,addSubCategoryApiResponse,updateSubCategoryApiResponse,deleteSubCategoryApiResponse } from "../../redux/apiResponse";
import { toast } from "react-toastify";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddFormModal from "../../includes/formModal/AddFormModal";
import UpdateFormModal from "../../includes/formModal/UpdateFormModal";
import DeleteFormModal from "../../includes/formModal/DeleteFormModal";
import { createFormData } from "../../utils";
import TableLoading from "../../includes/Loader/TableLoading";
import ImagePopup from "../../includes/imagePopup/ImagePopup";

const SubCategory = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const baseURL = `${import.meta.env.VITE_BASE_URL}/`;

  const { categoriesList,subCategoriesList,loading,isModalOpen,isUpdateModalOpen, isDeleteModalOpen, saveLoading } = useSelector((state) => state.categories);
  

  useEffect(() => {
    setIsOpen(isModalOpen)
  }, [isModalOpen]);

  useEffect(() => {
    setIsUpdateOpen(isUpdateModalOpen)
  }, [isUpdateModalOpen]);

  useEffect(() => {
    setIsDeleteOpen(isDeleteModalOpen)
  }, [isDeleteModalOpen]);

  useEffect(() => {
    dispatch(fetchSubCategoryApiResponse({ toast }));
    dispatch(fetchCategoryApiResponse({ toast }));
  }, []);

  const inputName = [
     [{ keyName: "subCategoryName", type:"text", label:"Sub Category Name" },{ keyName: "subCategoryImage", type:"file", label:"Sub Category Image" }],
     [{ keyName: "categoryId", type:"select-options", label:"Category Name" },{ keyName: "subCategoryDescription", type:"text-area", label:"Sub Category Description" }] 
  ];

  const formik = useFormik({
    initialValues: {
        categoryId: "",
        subCategoryName: "",
        subCategoryImage:"",
        subCategoryDescription:""
    },
    validationSchema: Yup.object({
        categoryId: Yup.string().required("Required"),
        subCategoryName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
        subCategoryImage: Yup.string().required("Required"),
        subCategoryDescription: Yup.string().max(1000, "Must be 1000 characters or less").required("Required")
    }),
    onSubmit: (formData) => {
        console.log('rrrformData',formData);
      dispatch(
        addSubCategoryApiResponse({ formData:createFormData(formData), toast})
      );
    },
  });

 

  // update form 
  const updateFormik = useFormik({
    initialValues: {
      _id:"",
      categoryId: "",
      subCategoryName: "",
      subCategoryImage:"",
      subCategoryDescription:""
  },
  validationSchema: Yup.object({
      categoryId: Yup.string().optional(),
      subCategoryName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      subCategoryImage: Yup.string().optional(),
      subCategoryDescription: Yup.string().max(1000, "Must be 1000 characters or less").required("Required")
  }),
    onSubmit: (formData) => {
      console.log('update cc submit',formData);
      dispatch(
        updateSubCategoryApiResponse({ formData, toast})
      );
    },
  });


  const onPatchValueHandler = (category) => {
    updateFormik.setValues({_id:category?._id,categoryId:category.categoryId._id,subCategoryName:category?.subCategoryName,subCategoryDescription:category?.subCategoryDescription})
  };


const handleDelete = (formData) => {
  dispatch(deleteSubCategoryApiResponse({formData,toast}))
};

const updateStatus = (formData) => {
  dispatch(updateSubCategoryApiResponse({ formData, toast}))
};
 

  return (
    <>
      <div className="midde_cont">
        <div className="container-fluid">
          <div className="row column_title">
            <div className="col-md-12">
              <div className="page_title">
                <h2>Sub Categories</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="white_shd full margin_bottom_30">
                <div className="full graph_head">
                  <div className="heading1 margin_0">
                    <h2>Sub Categories List</h2>
                  </div>
                  <div className="heading1 margin_0" style={{ float: "right" }}>
                    <AddFormModal inputName={inputName} formik={{formik,list:categoriesList}} isOpen={isOpen} loading={loading} modalType="Sub Category" />
                  </div>
                </div>
                <div className="table_section padding_infor_info">
                  <div className="table-responsive-sm">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>SR.NO</th>
                          <th> Category Name</th>
                          <th>Sub Category Name</th>
                          <th>Created</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading &&(subCategoriesList &&
                          subCategoriesList?.length &&
                          subCategoriesList?.map((category, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                  <tr>
                                    <td><ImagePopup images={[{src:`${import.meta.env.VITE_BASE_URL}/${category?.categoryId?.categoryImage}`,alt:category?.categoryId?.categoryName}]} /></td>
                                    <td>{category?.categoryId?.categoryName}</td>
                                  </tr>
                              </td>
                              <td>
                                  <tr>
                                    <td><ImagePopup images={[{src:`${import.meta.env.VITE_BASE_URL}/${category?.subCategoryImage}`,alt:category?.subCategoryName}]} /></td>
                                    <td>{category?.subCategoryName}</td>
                                  </tr>
                              </td>
                              <td>{moment(category?.createdAt).format("ll")}</td>
                              <td>{category?.isActive ? <span className="active__Status" onClick={()=>updateStatus({_id:category?._id,isActive:false})}>Active</span> : <span className="inactive__Status" onClick={()=>updateStatus({_id:category?._id,isActive:true})} >Inactive</span>}</td>
                              <td>
                              <UpdateFormModal inputName={inputName} formik={{formik:updateFormik,list:categoriesList}} isOpen={isUpdateOpen} loading={saveLoading} currentValue={{...category,image:baseURL + "" + category?.subCategoryImage}} onPatchValueHandler={(value)=> onPatchValueHandler(value)} modalType="Sub Category" />
                              <DeleteFormModal handleDelete={handleDelete} itemId={{_id:category?._id}} isDeleteOpen={isDeleteOpen} loading={saveLoading} />
                              </td>
                            </tr>
                          )))}
                      </tbody>
                    </table>
                    {loading && <TableLoading />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubCategory;


