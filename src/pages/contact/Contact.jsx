import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactApiResponse } from "../../redux/apiResponse";
import { toast } from "react-toastify";
import moment from "moment";
import { CirclesWithBar } from "react-loader-spinner";
import TableLoading from "../../includes/Loader/TableLoading";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const Contact = () => {
  const dispatch = useDispatch();
  const [expandedRow, setExpandedRow] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  const { contactList, loading } = useSelector((state) => state.contactUs);
  const search = "";

  useEffect(() => {
    dispatch(fetchContactApiResponse({ search, toast }));
  }, [dispatch]);

  useEffect(() => {
    setFilteredContacts(contactList);
  }, [contactList]);

  useEffect(() => {
    const filtered = contactList.filter(contact =>
      contact.conName.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [filterText, contactList]);

  const toggleExpandedRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null); // If the same row is clicked again, close it
    } else {
      setExpandedRow(index); // Otherwise, expand the clicked row
    }
  };

  const columns = [
    {
      name: "SR. NO",
      width: "70px",
      cell: (row, index) => <p>{index + 1}</p>
    },
    {
      name: "Name",
      selector: row => row.conName,
      sortable: true,
    },
    {
      name: "PhoneNumber",
      selector: row => row.conPhoneNumber,
      sortable: true,
    },
    {
      name: "CompanyName",
      selector: row => row.conCompanyName,
      sortable: true,
    },
    {
      name: "Subject",
      cell: (contact, index) => (
        <>
          <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>
            {expandedRow === index ? contact.conSubject : `${contact.conSubject.slice(0, 100)} ${contact.conSubject.length > 100 ? '...' : ''}`}
            {contact.conSubject.length > 100 && (
              <a onClick={() => toggleExpandedRow(index)} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} title="click here">{expandedRow === index ? 'View Less' : 'View More'}</a>
            )}
          </div>
        </>
      ),
      sortable: false,
    },
    {
      name: "Created At",
      cell: contact => moment(contact.createdAt).format("ll"),
      sortable: true,
    },
    {
      name: "View",
      cell: contact => (
        <Link to={`/contact/${contact._id}`} className="view_button" title="view contact details">
          <GrView />
        </Link>
      ),
    }
  ];

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
                  <input
                    type="text"
                    placeholder="Filter contacts..."
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
                  />
                  {loading ? (
                    <TableLoading />
                  ) : (
                    <>
                      {filteredContacts.length > 0 ? (
                        <DataTable columns={columns} data={filteredContacts} pagination />
                      ) : (
                        <>
                        <table className="table table-striped">
                            <thead className="error_table_head">
                              <tr>
                                <th>SR. NO</th>
                                <th>Name</th>
                                <th>PhoneNumber</th>
                                <th>CompanyName</th>
                                <th>Subject</th>
                                <th>Created At</th>
                                <th>View</th>
                              </tr>
                            </thead>
                          </table>
                        <p>No contacts found.</p>
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

export default Contact;
