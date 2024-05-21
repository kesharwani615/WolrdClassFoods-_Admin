import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoleApiResponse, rolesApiResponse, updateRoleApiResponse, deleteRoleApiResponse } from "../../redux/apiResponse";
import { toast } from "react-toastify";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddFormModal from "../../includes/formModal/AddFormModal";
import UpdateFormModal from "../../includes/formModal/UpdateFormModal";
import DeleteFormModal from "../../includes/formModal/DeleteFormModal";
import TableLoading from "../../includes/Loader/TableLoading";
import DataTable from "react-data-table-component";

const User = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filteredRoles, setFilteredRoles] = useState([]);

  const { roles, loading, isModalOpen, isUpdateModalOpen, isDeleteModalOpen, saveLoading } = useSelector((state) => state.role);

  useEffect(() => {
    setIsOpen(isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    setIsUpdateOpen(isUpdateModalOpen);
  }, [isUpdateModalOpen]);

  useEffect(() => {
    setIsDeleteOpen(isDeleteModalOpen);
  }, [isDeleteModalOpen]);

  useEffect(() => {
    dispatch(rolesApiResponse({ toast }));
  }, [dispatch]);

  useEffect(() => {
    setFilteredRoles(roles);
  }, [roles]);

  useEffect(() => {
    const filtered = roles.filter(role =>
      role.roleName.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredRoles(filtered);
  }, [filterText, roles]);

  const inputName = [
    [{ keyName: "roleName", type: "text", label: "Role" }],
  ];

  const formik = useFormik({
    initialValues: {
      roleName: ""
    },
    validationSchema: Yup.object({
      roleName: Yup.string().max(50, "Must be 50 characters or less").required("Required")
    }),
    onSubmit: (formData) => {
      dispatch(addRoleApiResponse({ formData, toast }));
    },
  });

  const updateFormik = useFormik({
    initialValues: {
      _id: "",
      roleName: ""
    },
    validationSchema: Yup.object({
      roleName: Yup.string().max(50, "Must be 50 characters or less").required("Required")
    }),
    onSubmit: (formData) => {
      dispatch(updateRoleApiResponse({ formData, toast }));
    },
  });

  const onPatchValueHandler = (role) => {
    updateFormik.setValues({ _id: role?._id, roleName: role?.roleName });
  };

  const handleDelete = (formData) => {
    dispatch(deleteRoleApiResponse({ formData, toast }));
  };

  const updateStatus = (formData) => {
    dispatch(updateRoleApiResponse({ formData, toast }));
  };

  const columns = [
    {
      name: "SR. NO",
      maxWidth: "100px",
      width: "70px",
      cell: (row, index) => <p>{index + 1}</p>
    },
    {
      name: "Role",
      cell: (role) => role?.roleName
    },
    {
      name: "Status",
      cell: (role) => role?.isActive ? (
        <span className="active__Status" onClick={() => updateStatus({ _id: role?._id, isActive: false })}>Active</span>
      ) : (
        <span className="inactive__Status" onClick={() => updateStatus({ _id: role?._id, isActive: true })}>Inactive</span>
      )
    },
    {
      name: "Created At",
      cell: (role) => moment(role?.createdAt).format("ll")
    },
    {
      name: "Actions",
      cell: (role) => (
        <>
          <UpdateFormModal
            inputName={inputName}
            formik={{ formik: updateFormik }}
            isOpen={isUpdateOpen}
            loading={saveLoading}
            currentValue={role}
            onPatchValueHandler={(value) => onPatchValueHandler(value)}
            modalType="Role"
          />
          <DeleteFormModal
            handleDelete={handleDelete}
            itemId={{ _id: role?._id }}
            isDeleteOpen={isDeleteOpen}
            loading={saveLoading}
          />
        </>
      )
    }
  ];

  return (
    <>
      <div className="midde_cont">
        <div className="container-fluid">
          <div className="row column_title">
            <div className="col-md-12">
              <div className="page_title">
                <h2>Users</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="white_shd full margin_bottom_30">
                <div className="full graph_head">
                  <div className="heading1 margin_0">
                    <h2>Users List</h2>
                  </div>
                  <div className="heading1 margin_0" style={{ float: "right" }}>
                    <AddFormModal inputName={inputName} formik={{ formik }} isOpen={isOpen} loading={loading} modalType="Role" />
                  </div>
                </div>
                <div className="table_section padding_infor_info">
                  <input
                    type="text"
                    placeholder="Filter roles..."
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
                  />
                  {loading ? (
                    <TableLoading />
                  ) : (
                    <>
                      {filteredRoles.length > 0 ? (
                        <DataTable columns={columns} data={filteredRoles} pagination />
                      ) : (
                        <>
                          <table className="table table-striped">
                            <thead className="error_table_head">
                              <tr>
                                <th>SR. NO</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                          </table>
                          <p>No roles found.</p>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;

