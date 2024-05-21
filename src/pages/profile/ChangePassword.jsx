import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePasswordUserApiResponse } from '../../redux/apiResponse';
import { useDispatch, useSelector } from 'react-redux';
import { inputError } from "../../includes/formError/InputError";
import { toast } from "react-toastify";


const ChangePassword = () => {
    const [userId,setUserId] = useState("");
    const dispatch = useDispatch();

  const { loading,message } = useSelector((state) => state.users);


    useEffect(()=>{
        const world_class_user = JSON.parse(localStorage.getItem('world_class_user'));
        setUserId(world_class_user?.user?._id)
    },[])

    const formik = useFormik({
        initialValues: {
            userId: "",
            oldPassword: "",
            newPassword: ""
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().max(50, "Must be 50 characters or less").required("old password is Required"),
            newPassword: Yup.string().max(50, "Must be 50 characters or less").required("new password is Required")
        }),
        onSubmit: (formData) => {
          dispatch(changePasswordUserApiResponse({ formData:{...formData,userId}, toast }));
        },
      });


    





  return (
  <>
    <div className="midde_cont">
        <div className="container-fluid">
          <div className="row column_title">
            <div className="col-md-12">
              <div className="page_title">
                <h2>Change Password</h2>
              </div>
              {message && <div class="alert alert-primary" role="alert">
                {message}
                </div>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="white_shd full margin_bottom_30">
             
                <div className="table_section padding_infor_info">
                <form onSubmit={formik.handleSubmit}>
              <div className="form-row">
              <div className="form-group col-md-6">
              <label htmlFor="descriptionText">Old Password</label>
              <input  type="text" name="oldPassword" className="form-control" {...formik.getFieldProps("oldPassword")} />
              {inputError(formik, "oldPassword")}
              </div>
              <div className="form-group col-md-6">
              <label htmlFor="descriptionText">New Password</label>
              <input  type="text" name="newPassword" className="form-control" {...formik.getFieldProps("newPassword")} />
              {inputError(formik, "newPassword")}
              </div>
              </div>

              { loading ? <button type="submit" className="btn btn-primary">wait...</button> : <button type="submit" className="btn btn-primary">Save</button>}
            </form>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
  )
}

export default ChangePassword
