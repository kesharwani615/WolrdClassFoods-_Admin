import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rolesApiResponse } from "../../redux/apiResponse";
import { toast } from "react-toastify";
import moment from "moment";

const Roles = () => {
  const dispatch = useDispatch();

  const { roles } = useSelector((state) => state.role);
  console.log("roles", roles);

  useEffect(() => {
    dispatch(rolesApiResponse({ toast }));
  }, []);

  const openModal = () => {
    const myModal = document.getElementById('myModal');
    myModal.show()
  }

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
                       {(roles && roles.length) && roles.map((role,index)=>(
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{role?.roleName}</td>
                          <td>{role?.isActive ? 'Active' : "Inactive"}</td>
                          <td>{ moment(role?.createdAt).format('ll')}</td>
                          <td></td>
                        </tr>
                       )) }
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
