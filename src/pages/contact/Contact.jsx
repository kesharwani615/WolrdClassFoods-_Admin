import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactApiResponse } from "../../redux/apiResponse";
import { toast } from "react-toastify";
import moment from "moment";


const Contact = () => {
  const dispatch = useDispatch();


  const { contactList,loading } = useSelector((state) => state.contactUs);
  console.log('contact',contactList);
  



  useEffect(() => {
    dispatch(fetchContactApiResponse({ toast }));
  }, []);



  return (
    <>
      <div className="midde_cont">
        <div className="container-fluid">
          <div className="row column_title">
            <div className="col-md-12">
              <div className="page_title">
                <h2>Contacts</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="white_shd full margin_bottom_30">
                <div className="full graph_head">
                  <div className="heading1 margin_0">
                    <h2>Contacts List</h2>
                  </div>
    
                </div>
                <div className="table_section padding_infor_info">
                  <div className="table-responsive-sm">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>SR.NO</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>PhoneNumber</th>
                          <th>CompanyName</th>
                          <th>Subject</th>
                          <th>Message</th>
                          <th>Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contactList &&
                          contactList?.length &&
                          contactList?.map((contact, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{contact?.conName}</td>
                              <td>{contact?.conEmail}</td>
                              <td>{contact?.conPhoneNumber}</td>
                              <td>{contact?.conCompanyName}</td>
                              <td>{contact?.conSubject}</td>
                              <td>{contact?.conMessage}</td>
                              <td>{moment(contact?.createdAt).format("ll")}</td>
                              
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

export default Contact;

