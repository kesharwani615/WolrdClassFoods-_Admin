import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  deleteUserApiResponse, fetchUsersApiResponse, updateUserStatusApiResponse } from "../../redux/apiResponse";
import { toast } from "react-toastify";
import moment from "moment";
import DeleteFormModal from "../../includes/formModal/DeleteFormModal";
import TableLoading from "../../includes/Loader/TableLoading";
import DataTable from "react-data-table-component";
import ImagePopup from "../../includes/imagePopup/ImagePopup";

const User = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filteredRoles, setFilteredRoles] = useState([]);
  const baseURL = `${import.meta.env.VITE_BASE_URL}/`;


  const { users, loading, isModalOpen, isUpdateModalOpen, isDeleteModalOpen, saveLoading } = useSelector((state) => state.users);

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
    dispatch(fetchUsersApiResponse({ toast }));
  }, [dispatch]);

  useEffect(() => {
    setFilteredRoles(users);
  }, [users]);

  useEffect(() => {
    const filtered = users.filter(role =>
      role.fullName.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredRoles(filtered);
  }, [filterText, users]);

 
  const handleDelete = (formData) => {
    dispatch(deleteUserApiResponse({ formData, toast }));
  };

  const updateStatus = (formData) => {
    dispatch(updateUserStatusApiResponse({ formData, toast }));
  };

  const columns = [
    {
      name: "SR. NO",
      maxWidth: "100px",
      width: "70px",
      cell: (row, index) => <p>{index + 1}</p>
    },
    {
      name: "Name",
      cell: (role) => role?.fullName
    },
    {
      name: "Avatar",
      cell: (user) => <ImagePopup images={[{ src: `${baseURL}${user?.avatar}`, alt: user?.fullName }]} />
    },
    {
      name: "Email",
      cell: (role) => role?.email
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
                </div>
                <div className="table_section padding_infor_info">
                  <input
                    type="text"
                    placeholder="Filter users..."
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                          </table>
                          <p>No users found.</p>
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

