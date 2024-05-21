import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryApiResponse, fetchSubCategoryApiResponse, addSubCategoryApiResponse, updateSubCategoryApiResponse, deleteSubCategoryApiResponse } from "../../redux/apiResponse";
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
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import DataTable from "react-data-table-component";

const SubCategory = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const baseURL = `${import.meta.env.VITE_BASE_URL}/`;

  const { categoriesList, subCategoriesList, loading, isModalOpen, isUpdateModalOpen, isDeleteModalOpen, saveLoading } = useSelector((state) => state.categories);

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
    dispatch(fetchSubCategoryApiResponse({ toast }));
    dispatch(fetchCategoryApiResponse({}));
  }, [dispatch]);

  useEffect(() => {
    setFilteredSubCategories(subCategoriesList);
  }, [subCategoriesList]);

  useEffect(() => {
    const filtered = subCategoriesList.filter(subCategory =>
      subCategory.subCategoryName.toLowerCase().includes(filterText.toLowerCase()) || subCategory?.categoryId?.categoryName.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredSubCategories(filtered);
  }, [filterText, subCategoriesList]);

  const inputName = [
    [{ keyName: "subCategoryName", type: "text", label: "Sub Category Name" }, { keyName: "subCategoryImage", type: "file", label: "Sub Category Image" }],
    [{ keyName: "categoryId", type: "select-options", label: "Category Name" }, { keyName: "subCategoryDescription", type: "text-area", label: "Sub Category Description" }]
  ];

  const formik = useFormik({
    initialValues: {
      categoryId: "",
      subCategoryName: "",
      subCategoryImage: "",
      subCategoryDescription: ""
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().required("Required"),
      subCategoryName: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
      subCategoryImage: Yup.string().required("Required"),
      subCategoryDescription: Yup.string().max(2000, "Must be 2000 characters or less").required("Required")
    }),
    onSubmit: (formData) => {
      dispatch(addSubCategoryApiResponse({ formData: createFormData(formData), toast }));
    },
  });

  const updateFormik = useFormik({
    initialValues: {
      _id: "",
      categoryId: "",
      subCategoryName: "",
      subCategoryImage: "",
      subCategoryDescription: ""
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().optional(),
      subCategoryName: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
      subCategoryImage: Yup.string().optional(),
      subCategoryDescription: Yup.string().max(2000, "Must be 2000 characters or less").required("Required")
    }),
    onSubmit: (formData) => {
      dispatch(updateSubCategoryApiResponse({ formData, toast }));
    },
  });

  const onPatchValueHandler = (category) => {
    updateFormik.setValues({ _id: category?._id, categoryId: category.categoryId._id, subCategoryName: category?.subCategoryName, subCategoryDescription: category?.subCategoryDescription });
  };

  const handleDelete = (formData) => {
    dispatch(deleteSubCategoryApiResponse({ formData, toast }));
  };

  const updateStatus = (formData) => {
    dispatch(updateSubCategoryApiResponse({ formData, toast }));
  };

  const columns = [
    {
      name: "SR. NO",
      maxWidth: "100px",
      width: "70px",
      cell: (row, index) => <p>{index + 1}</p>
    },
    {
      name: "Category Name",
      cell: (category) => (
        <>
          <span style={{ marginRight: '10px' }}><ImagePopup images={[{ src: `${baseURL}${category?.categoryId?.categoryImage}`, alt: category?.categoryId?.categoryName }]} /></span>
          <span>{category?.categoryId?.categoryName}</span>
        </>
      )
    },
    {
      name: "Sub Category Name",
      cell: (category) => (
        <>
          <span style={{ marginRight: '10px' }}><ImagePopup images={[{ src: `${baseURL}${category?.subCategoryImage}`, alt: category?.subCategoryName }]} /></span>
          <span>{category?.subCategoryName}</span>
        </>
      )
    },
    {
      name: "Created",
      cell: (category) => moment(category?.createdAt).format("ll")
    },
    {
      name: "Status",
      cell: (category) => category?.isActive ? (
        <span className="active__Status" onClick={() => updateStatus({ _id: category?._id, isActive: false })}>Active</span>
      ) : (
        <span className="inactive__Status" onClick={() => updateStatus({ _id: category?._id, isActive: true })}>Inactive</span>
      )
    },
    {
      name: "Actions",
      cell: (category) => (
        <>
          <Link to={'/sub-category/' + category?._id} className="view_button" title="view sub category details"><GrView /> </Link>
          <UpdateFormModal
            inputName={inputName}
            formik={{ formik: updateFormik, list: categoriesList.map((x) => ({ name: x.categoryName, id: x._id, ...x })) }}
            isOpen={isUpdateOpen}
            loading={saveLoading}
            currentValue={{ ...category, image: baseURL + category?.subCategoryImage }}
            onPatchValueHandler={(value) => onPatchValueHandler(value)}
            modalType="Sub Category"
          />
          <DeleteFormModal handleDelete={handleDelete} itemId={{ _id: category?._id }} isDeleteOpen={isDeleteOpen} loading={saveLoading} />
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
                    <AddFormModal inputName={inputName} formik={{ formik, list: categoriesList.map((x) => ({ name: x.categoryName, id: x._id, ...x })) }} isOpen={isOpen} loading={loading} modalType="Sub Category" />
                  </div>
                </div>
                <div className="table_section padding_infor_info">
                  <input
                    type="text"
                    placeholder="Filter subcategories..."
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
                  />
                  {loading ? (
                    <TableLoading />
                  ) : (
                    <>
                      {filteredSubCategories.length > 0 ? (
                        <DataTable columns={columns} data={filteredSubCategories} pagination />
                      ) : (
                        <>
                          <table className="table table-striped">
                            <thead className="error_table_head">
                              <tr>
                                <th>SR. NO</th>
                                <th>Category Name</th>
                                <th>Sub Category Name</th>
                                <th>Created</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                          </table>
                          <p>No subcategories found.</p>
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

export default SubCategory;
