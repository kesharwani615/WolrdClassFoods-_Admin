import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoleApiResponse, rolesApiResponse, updateRoleApiResponse, deleteRoleApiResponse } from "../../redux/apiResponse";
import { toast } from "react-toastify";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddFormModal from "../../includes/formModal/AddFormModal";
import UpdateFormModal from "../../includes/formModal/UpdateFormModal";
import DeleteFormModal from "../../includes/formModal/DeleteFormModal";
import TableLoading from "../../includes/Loader/TableLoading";

const Roles = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { roles,loading,isModalOpen,isUpdateModalOpen, isDeleteModalOpen, saveLoading } = useSelector((state) => state.role);
  

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
     [{ keyName: "roleName", type:"text", label:"Role" }],
    //  [{ keyName: "roleName", type:"text", label:"Role" },{ keyName: "roleName", type:"text", label:"Role" }] 
  ];
  
  const formik = useFormik({
    initialValues: {
      roleName: ""
    },
    validationSchema: Yup.object({
      roleName: Yup.string().max(15, "Must be 15 characters or less").required("Required")
    }),
    onSubmit: (formData) => {
      dispatch(
        addRoleApiResponse({ formData, toast})
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
                <h2>Roles</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="white_shd full margin_bottom_30">
                <div className="full graph_head">
                  <div className="heading1 margin_0">
                    <h2>Roles List</h2>
                  </div>
                  <div className="heading1 margin_0" style={{ float: "right" }}>
                    <AddFormModal inputName={inputName} formik={{formik}} isOpen={isOpen} loading={loading} modalType="Role" />
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
                        {!loading &&(roles &&
                          roles?.length &&
                          roles?.map((role, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{role?.roleName}</td>
                              <td>{role?.isActive ? <span className="active__Status" onClick={()=>updateStatus({_id:role?._id,isActive:false})}>Active</span> : <span className="inactive__Status" onClick={()=>updateStatus({_id:role?._id,isActive:true})} >Inactive</span>}</td>
                              <td>{moment(role?.createdAt).format("ll")}</td>
                              <td>
                              <UpdateFormModal inputName={inputName} formik={{formik:updateFormik}} isOpen={isUpdateOpen} loading={saveLoading} currentValue={role} onPatchValueHandler={(value)=> onPatchValueHandler(value)} modalType="Role" />
                              <DeleteFormModal handleDelete={handleDelete} itemId={{_id:role?._id}} isDeleteOpen={isDeleteOpen} loading={saveLoading} />
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

export default Roles;
