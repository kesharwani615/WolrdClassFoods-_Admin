import React from "react";
import { AiOutlineAlignRight, AiOutlineDown, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {

  const toggleSidebar = () => {
    const sidebar = document.getElementById( 'sidebar' );
    sidebar.classList.toggle('active');
  };

  return (
    <>
      <div className="topbar">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="full">
            <button type="button" onClick={toggleSidebar} id="sidebarCollapse" className="sidebar_toggle">
            <AiOutlineAlignRight style={{color:"#ffff"}} />
            </button>
        
            <div className="right_topbar">
              <div className="icon_info">
                <ul className="user_profile_dd">
                  <li>
                    <a className="dropdown-toggle" data-toggle="dropdown">
                      {/* <img
                        className="img-responsive rounded-circle"
                        src="images/layout_img/user_img.jpg"
                        alt="#"
                      /> */}
                      <span className="name_user">John David</span>
                      <AiOutlineDown style={{marginRight:"12px", color:"#ffff"}} />

                    </a>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        My Profile
                      </Link>
                      <a className="dropdown-item" href="#">
                        <span>Log Out</span> <AiOutlineLogout />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
