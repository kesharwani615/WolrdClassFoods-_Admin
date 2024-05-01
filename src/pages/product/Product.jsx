import React from 'react'

const Product = () => {
  return (
    <>
 {/* <div id="content">
               
            </div> */}

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
                                    <h2>Products List</h2>
                                 </div>
                              </div>
                              <div className="table_section padding_infor_info">
                                 <div className="table-responsive-sm">
                                    <table className="table">
                                       <thead>
                                          <tr>
                                             <th>#</th>
                                             <th>Firstname</th>
                                             <th>Lastname</th>
                                             <th>Age</th>
                                             <th>City</th>
                                             <th>Country</th>
                                             <th>Sex</th>
                                             <th>Example</th>
                                             <th>Example</th>
                                             <th>Example</th>
                                             <th>Example</th>
                                          </tr>
                                       </thead>
                                       <tbody>
                                          <tr>
                                             <td>1</td>
                                             <td>Anna</td>
                                             <td>Pitt</td>
                                             <td>35</td>
                                             <td>New York</td>
                                             <td>USA</td>
                                             <td>Female</td>
                                             <td>Yes</td>
                                             <td>Yes</td>
                                             <td>Yes</td>
                                             <td>Yes</td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>



{/* modal */}
         <div className="modal fade" id="myModal">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h4 className="modal-title">Modal Heading</h4>
                     <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body">
                     Modal body..
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>
               </div>
            </div>
         </div>
  
     
    </>
  )
}

export default Product
