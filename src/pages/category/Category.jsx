import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoleApiResponse, rolesApiResponse, updateRoleApiResponse, deleteRoleApiResponse, addCategoryApiResponse } from "../../redux/apiResponse";
import { toast } from "react-toastify";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddFormModal from "../../includes/formModal/AddFormModal";
import UpdateFormModal from "../../includes/formModal/UpdateFormModal";
import DeleteFormModal from "../../includes/formModal/DeleteFormModal";
import { createFormData } from "../../utils";

const Category = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { roles,loading,isModalOpen,isUpdateModalOpen, isDeleteModalOpen } = useSelector((state) => state.role);
  

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
    dispatch(rolesApiResponse({ toast }));
  }, []);

  const inputName = [
     [{ keyName: "categoryName", type:"text", label:"Category Name" },{ keyName: "categoryImage", type:"file", label:"Category Image" }],
     [{ keyName: "categoryDescription", type:"text-area", label:"Category Description" }] 
  ];

  const formik = useFormik({
    initialValues: {
        categoryName: "",
        categoryImage:"",
        categoryDescription:""
    },
    validationSchema: Yup.object({
        categoryName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
        categoryImage: Yup.string().required("Required"),
        categoryDescription: Yup.string().max(1000, "Must be 1000 characters or less").required("Required")
    }),
    onSubmit: (formData) => {
      dispatch(
        addCategoryApiResponse({ formData:createFormData(formData), toast})
      );
    },
  });

 

  // update form 
  const updateFormik = useFormik({
    initialValues: {
      _id:"",
      roleName: ""
    },
    validationSchema: Yup.object({
      roleName: Yup.string().max(15, "Must be 15 characters or less").required("Required")
    }),
    onSubmit: (formData) => {
      console.log('update submit',formData);
      dispatch(
        updateRoleApiResponse({ formData, toast})
      );
    },
  });


  const onPatchValueHandler = (role) => {
    updateFormik.setValues({_id:role?._id,roleName:role?.roleName})
  };


const handleDelete = (formData) => {
  dispatch(deleteRoleApiResponse({formData,toast}))
};

const updateStatus = (formData) => {
  dispatch(updateRoleApiResponse({ formData, toast}))
};
 

  return (
    <>
      <div className="midde_cont">
        <div className="container-fluid">
          <div className="row column_title">
            <div className="col-md-12">
              <div className="page_title">
                <h2>Categories</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="white_shd full margin_bottom_30">
                <div className="full graph_head">
                  <div className="heading1 margin_0">
                    <h2>Categories List</h2>
                  </div>
                  <div className="heading1 margin_0" style={{ float: "right" }}>
                    <AddFormModal inputName={inputName} formik={formik} isOpen={isOpen} loading={loading} modalType="Category" />
                  </div>
                </div>
                <div className="table_section padding_infor_info">
                  <div className="table-responsive-sm">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>SR. NO</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Created At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles &&
                          roles?.length &&
                          roles?.map((role, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{role?.roleName}</td>
                              <td>{role?.isActive ? <span className="active__Status" onClick={()=>updateStatus({_id:role?._id,isActive:false})}>Active</span> : <span className="inactive__Status" onClick={()=>updateStatus({_id:role?._id,isActive:true})} >Inactive</span>}</td>
                              <td>{moment(role?.createdAt).format("ll")}</td>
                              <td>
                              <UpdateFormModal inputName={inputName} formik={updateFormik} isOpen={isUpdateOpen} loading={loading} currentValue={role} onPatchValueHandler={(value)=> onPatchValueHandler(value)} />
                              <DeleteFormModal handleDelete={handleDelete} itemId={{_id:role?._id}} isDeleteOpen={isDeleteOpen} loading={loading} />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
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

export default Category;
