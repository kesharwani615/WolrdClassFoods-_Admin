import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSubCategoryByIdApiResponse } from '../../redux/apiResponse';
import { toast } from "react-toastify";
import ImagePopup from '../../includes/imagePopup/ImagePopup';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import TableLoading from '../../includes/Loader/TableLoading';

const SubCategoryViewPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigation = useNavigate();

  const { subCategory, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchSubCategoryByIdApiResponse({formData:{_id:id}, toast }));
  }, []);

const goback = () =>{
    navigation(-1);
};

  return (
    <>
       <div className="midde_cont">
                  <div className="container-fluid">
                     <div className="row column_title">
                        <div className="col-md-12">
                           <div className="page_title">
                              <button className="goback_btn" onClick={goback} title="go back"><AiOutlineArrowLeft style={{marginRight:"10px",cursor:"pointer"}} title="go back" />Back</button>
                           </div>
                        </div>
                     </div>
                     <div className="row column1">
                        <div className="col-md-12">
                           <div className="white_shd full margin_bottom_30">
                              <div className="full graph_head">
                                 <div className="heading1 margin_0">
                                    <h2>Sub Category Details</h2>
                                 </div>
                              </div>
                              {!loading && <div className="full price_table padding_infor_info">
                                 <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profile_details margin_bottom_30">
                                       <div className="contact_blog">
                                          <h4 className="brief">Category</h4>
                                          <div className="contact_inner">
                                             <div className="left">
                                                <h3 style={{ textTransform: "capitalize" }}>{subCategory?.categoryId?.categoryName}</h3>
                                                <p><strong>Status: </strong>{subCategory?.categoryId?.isActive ? <span className="active__Status" style={{cursor:"default"}}>Active</span> : <span className="inactive__Status" style={{cursor:"default"}}>Inactive</span>}</p>
                                                <p><strong>Category Description: </strong>{subCategory?.categoryId?.categoryDescription}</p>       
                                             </div>
                                             <div className="right">
                                                <div className="profile_contacts">
                                                <ImagePopup images={[{src:`${import.meta.env.VITE_BASE_URL}/${subCategory?.categoryId.categoryImage}`,alt:subCategory?.categoryId.categoryName}]} />
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profile_details margin_bottom_30">
                                       <div className="contact_blog">
                                          <h4 className="brief">Sub Category</h4>
                                          <div className="contact_inner">
                                             <div className="left">
                                                <h3 style={{ textTransform: "capitalize" }}>{subCategory?.subCategoryName}</h3>
                                                <p><strong>Status: </strong>{subCategory?.isActive ? <span className="active__Status">Active</span> : <span className="inactive__Status">Inactive</span>}</p>
                                                <p><strong>Category Description: </strong>{subCategory?.subCategoryDescription}</p>       
                                             </div>
                                             <div className="right">
                                                <div className="profile_contacts">
                                                <ImagePopup images={[{src:`${import.meta.env.VITE_BASE_URL}/${subCategory?.subCategoryImage}`,alt:subCategory?.subCategoryName}]} />
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>}
                              {loading && <TableLoading />}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
    </>
  )
}

export default SubCategoryViewPage
