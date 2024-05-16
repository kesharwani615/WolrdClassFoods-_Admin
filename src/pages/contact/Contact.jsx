import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactApiResponse } from "../../redux/apiResponse";
import { toast } from "react-toastify";
import moment from "moment";
import { CirclesWithBar } from "react-loader-spinner";
import TableLoading from "../../includes/Loader/TableLoading";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";


const Contact = () => {
  const dispatch = useDispatch();
  const [expandedRow, setExpandedRow] = useState(null);


  const { contactList,loading } = useSelector((state) => state.contactUs);
  const search = "";
  
  useEffect(() => {
    dispatch(fetchContactApiResponse({search, toast }));
  }, []);

// Function to toggle the expanded row
const toggleExpandedRow = (index) => {
  if (expandedRow === index) {
    setExpandedRow(null); // If the same row is clicked again, close it
  } else {
    setExpandedRow(index); // Otherwise, expand the clicked row
  }
};

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
                    <table className="table table-striped">
                      <thead class="thead-dark">
                        <tr>
                          <th>SR.NO</th>
                          <th>Name</th>
                          {/* <th>Email</th> */}
                          <th>PhoneNumber</th>
                          <th>CompanyName</th>
                          <th>Subject</th>
                          {/* <th>Message</th> */}
                          <th>Created At</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading &&(contactList &&
                          contactList?.length &&
                          contactList?.map((contact, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{contact?.conName}</td>
                              {/* <td>{contact?.conEmail}</td> */}
                              <td>{contact?.conPhoneNumber}</td>
                              <td>{contact?.conCompanyName}</td>
                              {/* <td>{contact?.conSubject}</td> */}
                              <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }} title={contact?.conSubject}>
                                {expandedRow === index ? contact?.conSubject : `${contact?.conSubject.slice(0, 100)} ${contact?.conSubject.length > 100 ? '...' : ''}`}
                                {contact?.conSubject.length > 100 && (
                                  <a onClick={() => toggleExpandedRow(index)} style={{ textDecoration: 'underline', cursor: 'pointer',color:'blue' }} title="click here">{expandedRow === index ? 'View Less' : 'View More'}</a>
                               )}
                              </td>
                              {/* <td>{contact?.conMessage}</td> */}
                              <td>{moment(contact?.createdAt).format("ll")}</td>
                              <td title="view details"><Link to={'/contact/' + contact?._id} className="view_button" title="view sub category details"><GrView /> </Link></td>
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

export default Contact;


