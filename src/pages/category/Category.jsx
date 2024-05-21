import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRoleApiResponse, deleteRoleApiResponse, addCategoryApiResponse, fetchCategoryApiResponse, updateCategoryApiResponse, deleteCategoryApiResponse } from "../../redux/apiResponse";
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
import DataTable from "react-data-table-component";

const Category = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const baseURL = `${import.meta.env.VITE_BASE_URL}/`;

  const { categoriesList, loading, isModalOpen, isUpdateModalOpen, isDeleteModalOpen, saveLoading } = useSelector((state) => state.categories);

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
    dispatch(fetchCategoryApiResponse({ toast }));
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategories(categoriesList);
  }, [categoriesList]);

  useEffect(() => {
    const filtered = categoriesList.filter(category => 
      category.categoryName.toLowerCase().includes(filterText.toLowerCase()) ||
      category.categoryDescription.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [filterText, categoriesList]);

  const toggleDescription = (id) => {
    setExpandedDescriptions(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const inputName = [
    [{ keyName: "categoryName", type: "text", label: "Category Name" }, { keyName: "categoryImage", type: "file", label: "Category Image" }],
    [{ keyName: "categoryDescription", type: "text-area", label: "Category Description" }]
  ];

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      categoryImage: "",
      categoryDescription: ""
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
      categoryImage: Yup.string().required("Required"),
      categoryDescription: Yup.string().max(2000, "Must be 2000 characters or less").required("Required")
    }),
    onSubmit: (formData) => {
      dispatch(addCategoryApiResponse({ formData: createFormData(formData), toast }));
    },
  });

  const updateFormik = useFormik({
    initialValues: {
      _id: "",
      categoryName: "",
      categoryImage: "",
      categoryDescription: ""
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().max(100, "Must be 100 characters or less").required("Required"),
      categoryImage: Yup.string().optional(),
      categoryDescription: Yup.string().max(2000, "Must be 2000 characters or less").required("Required")
    }),
    onSubmit: (formData) => {
      dispatch(updateCategoryApiResponse({ formData, toast }));
    },
  });

  const onPatchValueHandler = (category) => {
    updateFormik.setValues({
      _id: category?._id,
      categoryName: category?.categoryName,
      categoryDescription: category?.categoryDescription
    });
  };

  const handleDelete = (formData) => {
    dispatch(deleteCategoryApiResponse({ formData, toast }));
  };

  const updateStatus = (formData) => {
    dispatch(updateCategoryApiResponse({ formData, toast }));
  };

  const columns = [
    {
      name: "SR.NO",
      maxWidth: "100px",
      width: "70px",
      cell: (row, index) => <p>{index + 1}</p>
    },
    {
      name: "Category Name",
      maxWidth: '600px',
      width: "300px",
      cell: (category) => (
        <>
          <span style={{ marginRight: '10px' }}><ImagePopup images={[{ src: `${baseURL}${category?.categoryImage}`, alt: category?.categoryName }]} /></span>
          <span>{category?.categoryName}</span>
        </>
      )
    },
    {
      name: "Description",
      cell: (category) => (
        <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }} title={category?.categoryDescription}>
          {expandedDescriptions[category._id] ? category.categoryDescription : `${category?.categoryDescription.slice(0, 140)} ${category?.categoryDescription.length > 100 ? '...' : ''}`}
          {category?.categoryDescription.length > 100 && (<a style={{ textDecoration: 'underline', cursor: 'pointer',color:'blue' }} title="click here" onClick={() => toggleDescription(category._id)}>
            {expandedDescriptions[category._id] ? 'Show Less' : 'View More'}
          </a>)}
        </div>
      )
    },
    {
      name: "Created",
      cell: (category) => moment(category?.createdAt).format("ll")
    },
    {
      name: "Status",
      cell: (category) => category?.isActive ? <span className="active__Status" onClick={() => updateStatus({ _id: category?._id, isActive: false })}>Active</span> : <span className="inactive__Status" onClick={() => updateStatus({ _id: category?._id, isActive: true })} >Inactive</span>
    },
    {
      name: "Actions",
      cell: (category) => (
        <>
          <UpdateFormModal inputName={inputName} formik={{ formik: updateFormik }} isOpen={isUpdateOpen} loading={saveLoading} currentValue={{ ...category, image: baseURL + "" + category?.categoryImage }} onPatchValueHandler={(value) => onPatchValueHandler(value)} modalType="Category" />
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
                    <AddFormModal inputName={inputName} formik={{ formik }} isOpen={isOpen} loading={loading} modalType="Category" />
                  </div>
                </div>
                <div className="table_section padding_infor_info">
                  <input
                    type="text"
                    placeholder="Filter categories..."
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
                  />
                  {loading ? (
                    <TableLoading />
                  ) : (
                    <>
                      {filteredCategories.length > 0 ? (
                        <DataTable columns={columns} data={filteredCategories} pagination />
                      ) : (
                        <>
                          <table className="table table-striped">
                            <thead className="error_table_head">
                              <tr>
                                <th>SR.NO</th>
                                <th>Category Name</th>
                                <th>Description</th>
                                <th>Created</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                          </table>
                          <p>No categories found.</p>
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

export default Category;




// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateRoleApiResponse, deleteRoleApiResponse, addCategoryApiResponse, fetchCategoryApiResponse, updateCategoryApiResponse, deleteCategoryApiResponse } from "../../redux/apiResponse";
// import { toast } from "react-toastify";
// import moment from "moment";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import AddFormModal from "../../includes/formModal/AddFormModal";
// import UpdateFormModal from "../../includes/formModal/UpdateFormModal";
// import DeleteFormModal from "../../includes/formModal/DeleteFormModal";
// import { createFormData } from "../../utils";
// import TableLoading from "../../includes/Loader/TableLoading";
// import ImagePopup from "../../includes/imagePopup/ImagePopup";

// const Category = () => {
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isUpdateOpen, setIsUpdateOpen] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const baseURL = `${import.meta.env.VITE_BASE_URL}/`;

//   const { categoriesList,loading,isModalOpen,isUpdateModalOpen, isDeleteModalOpen, saveLoading } = useSelector((state) => state.categories);
  

//   useEffect(() => {
//     setIsOpen(isModalOpen)
//   }, [isModalOpen]);

//   useEffect(() => {
//     setIsUpdateOpen(isUpdateModalOpen)
//   }, [isUpdateModalOpen]);

//   useEffect(() => {
//     setIsDeleteOpen(isDeleteModalOpen)
//   }, [isDeleteModalOpen]);

//   useEffect(() => {
//     dispatch(fetchCategoryApiResponse({ toast }));
//   }, []);

//   const inputName = [
//      [{ keyName: "categoryName", type:"text", label:"Category Name" },{ keyName: "categoryImage", type:"file", label:"Category Image" }],
//      [{ keyName: "categoryDescription", type:"text-area", label:"Category Description" }] 
//   ];

//   const formik = useFormik({
//     initialValues: {
//         categoryName: "",
//         categoryImage:"",
//         categoryDescription:""
//     },
//     validationSchema: Yup.object({
//         categoryName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
//         categoryImage: Yup.string().required("Required"),
//         categoryDescription: Yup.string().max(1000, "Must be 1000 characters or less").required("Required")
//     }),
//     onSubmit: (formData) => {
//       dispatch(
//         addCategoryApiResponse({ formData:createFormData(formData), toast})
//       );
//     },
//   });

 

//   const updateFormik = useFormik({
//     initialValues: {
//       _id:"",
//       categoryName: "",
//       categoryImage:"",
//       categoryDescription:""
//   },
//   validationSchema: Yup.object({
//       categoryName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
//       categoryImage: Yup.string().optional(),
//       categoryDescription: Yup.string().max(1000, "Must be 1000 characters or less").required("Required")
//   }),
//     onSubmit: (formData) => {
//       console.log('update cc submit',formData);
//       dispatch(
//         updateCategoryApiResponse({ formData, toast})
//       );
//     },
//   });


//   const onPatchValueHandler = (category) => {
//     updateFormik.setValues({_id:category?._id,categoryName:category?.categoryName,categoryDescription:category?.categoryDescription})
//   };


// const handleDelete = (formData) => {
//   dispatch(deleteCategoryApiResponse({formData,toast}))
// };

// const updateStatus = (formData) => {
//   dispatch(updateCategoryApiResponse({ formData, toast}))
// };


// const toggleExpandedRow = (index) => {
//   if (expandedRow === index) {
//     setExpandedRow(null); 
//   } else {
//     setExpandedRow(index);
//   }
// };
 

//   return (
//     <>
//       <div className="midde_cont">
//         <div className="container-fluid">
//           <div className="row column_title">
//             <div className="col-md-12">
//               <div className="page_title">
//                 <h2>Categories</h2>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//               <div className="white_shd full margin_bottom_30">
//                 <div className="full graph_head">
//                   <div className="heading1 margin_0">
//                     <h2>Categories List</h2>
//                   </div>
//                   <div className="heading1 margin_0" style={{ float: "right" }}>
//                     <AddFormModal inputName={inputName} formik={{formik}} isOpen={isOpen} loading={loading} modalType="Category" />
//                   </div>
//                 </div>
//                 <div className="table_section padding_infor_info">
//                   <div className="table-responsive-sm">
//                     <table className="table table-striped">
//                       <thead class="thead-dark">
//                         <tr>
//                           <th>SR.NO</th>
//                           <th> Category Name</th>
//                           <th>Description</th>
//                           <th>Created</th>
//                           <th>Status</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {!loading &&(categoriesList &&
//                           categoriesList?.length > 0 &&
//                           categoriesList?.map((category, index) => (
//                             <tr key={index}>
//                               <td>{index + 1}</td>
//                               <td>
//                                   <>
//                                     <span style={{ marginRight: '10px' }}><ImagePopup images={[{src:`${import.meta.env.VITE_BASE_URL}/${category.categoryImage}`,alt:category?.categoryName}]} /></span>
//                                     <span>{category?.categoryName}</span>
//                                   </>
//                               </td>
//                               <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }} title={category?.categoryDescription}>
//                                 {expandedRow === index ? category?.categoryDescription : `${category?.categoryDescription.slice(0, 140)} ${category?.categoryDescription.length > 100 ? '...' : ''}`}
//                                 {category?.categoryDescription.length > 100 && (
//                                   <a onClick={() => toggleExpandedRow(index)} style={{ textDecoration: 'underline', cursor: 'pointer',color:'blue' }} title="click here">{expandedRow === index ? 'View Less' : 'View More'}</a>
//                                )}
//                               </td>
//                               <td>{moment(category?.createdAt).format("ll")}</td>
//                               <td>{category?.isActive ? <span className="active__Status" onClick={()=>updateStatus({_id:category?._id,isActive:false})}>Active</span> : <span className="inactive__Status" onClick={()=>updateStatus({_id:category?._id,isActive:true})} >Inactive</span>}</td>
//                               <td>
//                               <UpdateFormModal inputName={inputName} formik={{formik:updateFormik}} isOpen={isUpdateOpen} loading={saveLoading} currentValue={{...category,image:baseURL + "" + category?.categoryImage}} onPatchValueHandler={(value)=> onPatchValueHandler(value)} modalType="Category" />
//                               <DeleteFormModal handleDelete={handleDelete} itemId={{_id:category?._id}} isDeleteOpen={isDeleteOpen} loading={saveLoading} />
//                               </td>
//                             </tr>
//                           )))}
//                       </tbody>
//                     </table>
//                     {loading && <TableLoading />}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Category;

