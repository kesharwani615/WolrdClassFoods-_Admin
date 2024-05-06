import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoleApiResponse, rolesApiResponse } from "../../redux/apiResponse";
import { toast } from "react-toastify";
import moment from "moment";
import InputFormModal from "../../includes/formModal/InputFormModal";
import { useFormik } from "formik";
import * as Yup from "yup";

const Roles = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);

  const { roles,loading } = useSelector((state) => state.role);
  console.log("roles", roles);
  
  useEffect(() => {
    setIsOpen(loading)
  }, [loading]);

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
      console.log("values.............nn", formData);
      dispatch(
        addRoleApiResponse({ formData, toast})
      );
    },
  });

  return (
    <>
      {/* <div id="content">
                  
               </div> */}

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
                    <InputFormModal inputName={inputName} formik={formik} isOpen={isOpen} />
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
                              <td>{role?.isActive ? "Active" : "Inactive"}</td>
                              <td>{moment(role?.createdAt).format("ll")}</td>
                              <td></td>
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

export default Roles;
