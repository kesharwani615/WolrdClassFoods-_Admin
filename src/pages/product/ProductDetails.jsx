import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductByIdApiResponse, fetchSubCategoryByIdApiResponse } from '../../redux/apiResponse';
import { toast } from "react-toastify";
import ImagePopup from '../../includes/imagePopup/ImagePopup';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import TableLoading from '../../includes/Loader/TableLoading';
import moment from 'moment';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigation = useNavigate();

  const { product, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductByIdApiResponse({formData:{_id:id}, toast }));
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
                                    <h2>Product Details</h2>
                                 </div>
                              </div>
                              {!loading && <div className="full price_table padding_infor_info">
                                 <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profile_details margin_bottom_30">
                                       <div className="contact_blog">
                                          <div className="contact_inner">
                                             <div className="left">
                                                <p><strong>Product Name: </strong>{product?.productName}</p>       
                                                <p><strong>storage: </strong>{product?.storage}</p>       
                                                <p><strong>Pack Size: </strong>{product?.packSize}</p>       
                                                <p><strong>Carton Size: </strong>{product?.cartonSize}</p>       
                                                <p><strong>Status: </strong>{product?.isActive ? <span className="active__Status" style={{cursor:"default"}}>Active</span> : <span className="inactive__Status" style={{cursor:"default"}}>Inactive</span>}</p>
                                                <p><strong>Created: </strong>{moment(product?.createdAt).format("ll")}</p>       
                                                <p><strong>Category Description: </strong>{product?.productDescription}</p>       
                                             </div>
                                             <div className="right">
                                                <div className="profile_contacts">
                                                <ImagePopup images={[{src:`${import.meta.env.VITE_BASE_URL}/${product?.productImage}`,alt:product?.productName}]} />
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

export default ProductDetails
