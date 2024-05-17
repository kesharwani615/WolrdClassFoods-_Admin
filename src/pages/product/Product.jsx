import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryApiResponse, fetchSubCategoryApiResponse,addSubCategoryApiResponse,updateSubCategoryApiResponse,deleteSubCategoryApiResponse, fetchAllProductsApiResponse, addProductApiResponse, updateProductApiResponse, deleteProductApiResponse } from "../../redux/apiResponse";
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
import { MdOutlinePreview } from "react-icons/md";
import { GrView } from "react-icons/gr";

const Product = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const baseURL = `${import.meta.env.VITE_BASE_URL}/`;

  const { productsList,loading,isModalOpen,isUpdateModalOpen, isDeleteModalOpen, saveLoading } = useSelector((state) => state.product);
  const { subCategoriesList } = useSelector((state) => state.categories);

  

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
   let search = "";
    dispatch(fetchAllProductsApiResponse({search, toast }));
    dispatch(fetchSubCategoryApiResponse({ toast }));
  }, []);

  const inputName = [
     [{ keyName: "subCategoryId", type:"select-options", label:"Sub Category Name" },{ keyName: "productImage", type:"file", label:"Product Image" }],
     [{ keyName: "productName", type:"text", label:"Product Name" },{ keyName: "cartonSize", type:"text", label:"Carton Size" }], 
     [{ keyName: "storage", type:"text", label:"Storage" },{ keyName: "packSize", type:"text", label:"Pack Size" }],
     [{ keyName: "productDescription", type:"text-area", label:"Product Description" }] 
  ];

  const formik = useFormik({
    initialValues: {
      subCategoryId: "",
        productName: "",
        productImage:"",
        storage:"",
        packSize:"",
        cartonSize:"",
        productDescription:""
    },
    validationSchema: Yup.object({
      subCategoryId: Yup.string().required("Required"),
      productName: Yup.string().max(250, "Must be 250 characters or less").required("Required"),
      storage: Yup.string().required("Required"),
      packSize: Yup.string().required("Required"),
      cartonSize: Yup.string().required("Required"),
      productImage: Yup.string().required("Required"),
      productDescription: Yup.string().max(2000, "Must be 2000 characters or less").required("Required")
    }),
    onSubmit: (formData) => {
        console.log('rrrformData',formData);
      dispatch(
         addProductApiResponse({ formData:createFormData(formData), toast})
      );
    },
  });

 

  // update form 
  const updateFormik = useFormik({
    initialValues: {
      _id:"",
      subCategoryId: "",
      productName: "",
      productImage:"",
      storage:"",
      packSize:"",
      cartonSize:"",
      productDescription:""
  },
  validationSchema: Yup.object({
   subCategoryId: Yup.string().required("Required"),
   productName: Yup.string().max(250, "Must be 250 characters or less").required("Required"),
   storage: Yup.string().required("Required"),
   packSize: Yup.string().required("Required"),
   cartonSize: Yup.string().required("Required"),
   productImage: Yup.string().optional(),
   productDescription: Yup.string().max(2000, "Must be 2000 characters or less").required("Required")
  }),
    onSubmit: (formData) => {
      console.log('update cc submit',formData);
      dispatch(
         updateProductApiResponse({ formData, toast})
      );
    },
  });


  const onPatchValueHandler = (category) => {
    updateFormik.setValues({
      _id:category?._id,
      subCategoryId: category?.subCategoryId,
      productName: category?.productName,
      storage:category?.storage,
      packSize:category?.packSize,
      cartonSize:category?.cartonSize,
      productDescription:category?.productDescription
   })
  };


const handleDelete = (formData) => {
  dispatch(deleteProductApiResponse({formData,toast}))
};

const updateStatus = (formData) => {
  dispatch(updateProductApiResponse({ formData, toast}))
};
 

  return (
    <>
      <div className="midde_cont">
        <div className="container-fluid">
          <div className="row column_title">
            <div className="col-md-12">
              <div className="page_title">
                <h2>Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="white_shd full margin_bottom_30">
                <div className="full graph_head">
                  <div className="heading1 margin_0">
                    <h2>Product List</h2>
                  </div>
                  <div className="heading1 margin_0" style={{ float: "right" }}>
                    <AddFormModal inputName={inputName} formik={{formik,list:subCategoriesList.map((x)=>({name:x.subCategoryName,id:x._id,...x}))}} isOpen={isOpen} loading={loading} modalType="Product" />
                  </div>
                </div>
                <div className="table_section padding_infor_info">
                  <div className="table-responsive-sm">
                    <table className="table table-striped">
                      <thead class="thead-dark">
                        <tr>
                          <th>SR.NO</th>
                          <th>Product Name</th>
                          <th>Storage</th>
                          <th>PackSize</th>
                          <th>CartonSize</th>
                          <th>Created</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading &&(productsList &&
                          productsList?.length > 0 &&
                          productsList?.map((category, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                  <>
                                    <span style={{ marginRight: '10px' }}><ImagePopup images={[{src:`${import.meta.env.VITE_BASE_URL}/${category?.productImage}`,alt:category?.productName}]} /></span>
                                    <span>{category?.productName}</span>
                                  </>
                              </td>
                              <td>{category?.storage}</td>
                              <td>{category?.packSize}</td>
                              <td>{category?.cartonSize}</td>
                              <td>{moment(category?.createdAt).format("ll")}</td>
                              <td>{category?.isActive ? <span className="active__Status" onClick={()=>updateStatus({_id:category?._id,isActive:false})}>Active</span> : <span className="inactive__Status" onClick={()=>updateStatus({_id:category?._id,isActive:true})} >Inactive</span>}</td>
                              <td>
                              <Link to={'/product/' + category?._id} className="view_button" title="view product details"><GrView /> </Link>
                              <UpdateFormModal inputName={inputName} formik={{formik:updateFormik,list:subCategoriesList.map((x)=>({name:x.subCategoryName,id:x._id,...x}))}} isOpen={isUpdateOpen} loading={saveLoading} currentValue={{...category,image:baseURL + "" + category?.productImage}} onPatchValueHandler={(value)=> onPatchValueHandler(value)} modalType="Product" />
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

export default Product;


