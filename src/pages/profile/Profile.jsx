import React from 'react'

const Profile = () => {
  return (
    <>
       <div className="midde_cont">
                  <div className="container-fluid">
                     <div className="row column_title">
                        <div className="col-md-12">
                           <div className="page_title">
                              <h2>Profile</h2>
                           </div>
                        </div>
                     </div>
                     <div className="row column1">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                           <div className="white_shd full margin_bottom_30">
                              <div className="full graph_head">
                                 <div className="heading1 margin_0">
                                    <h2>User profile</h2>
                                 </div>
                              </div>
                              <div className="full price_table padding_infor_info">
                                 <div className="row">
                                 
                                    <div className="col-lg-12">
                                       <div className="full dis_flex center_text">
                                          <div className="profile_img">
                                          {/* <img width="180" className="rounded-circle" src="images/layout_img/user_img.jpg" alt="#" /> */}
                                          </div>
                                          <div className="profile_contant">
                                             <div className="contact_inner">
                                                <h3>John Smith</h3>
                                                <p><strong>About: </strong>Frontend Developer</p>
                                                <ul className="list-unstyled">
                                                   <li> : test@gmail.com</li>
                                                   <li> : 987 654 3210</li>
                                                </ul>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

               </div>
               </div>
    </>
  )
}

export default Profile
