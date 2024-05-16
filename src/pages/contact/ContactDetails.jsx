import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchContactByIdApiResponse } from '../../redux/apiResponse';
import { toast } from "react-toastify";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import TableLoading from '../../includes/Loader/TableLoading';
import moment from 'moment';

const ContactDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigation = useNavigate();

  const { contactDetails, loading } = useSelector((state) => state.contactUs);

  useEffect(() => {
    dispatch(fetchContactByIdApiResponse({formData:{_id:id}, toast }));
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
                                    <h2>Contact Details</h2>
                                 </div>
                              </div>
                              {!loading && <div className="full price_table padding_infor_info">
                                 <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 profile_details margin_bottom_30">
                                       <div className="contact_blog">
                                          <h4 className="brief">Contact</h4>
                                          <div className="contact_inner">
                                             <div className="left">
                                                <p><strong>Name: </strong>{contactDetails?.conName}</p>       
                                                <p><strong>Email: </strong>{contactDetails?.conEmail}</p>       
                                                <p><strong>Phone Number: </strong>{contactDetails?.conPhoneNumber}</p>       
                                                <p><strong>Company Name: </strong>{contactDetails?.conCompanyName}</p>       
                                                <p><strong>Subject: </strong>{contactDetails?.conSubject}</p>       
                                                <p><strong>Message: </strong>{contactDetails?.conMessage}</p>       
                                                <p><strong>Created Date: </strong>{moment(contactDetails?.createdAt).format("ll")}</p>       
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

export default ContactDetails

