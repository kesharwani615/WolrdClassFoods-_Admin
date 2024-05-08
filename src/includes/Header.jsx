import React, { useEffect } from "react";
import { AiOutlineAlignRight, AiOutlineDown, AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { logoutApiResponse } from "../redux/apiResponse";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isNavigate } = useSelector((state) => state.auth);

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarTabName = document.querySelectorAll('.sidebar_tab__name_toggle');
    sidebar.classList.toggle('active');
    for(let tabName of sidebarTabName){
      tabName.classList.toggle('active');
    }
  };

  

  const logout = () => {
    const formData = {};
    console.log('logout 1');
    dispatch(
      logoutApiResponse({formData, toast, isNavigate:true })
    );
  };

    useEffect(() => {
    if(isNavigate){
      navigate("/login");
    }
  },[isNavigate])

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
                      <span className="name_user">Profile</span>
                      <AiOutlineDown style={{marginRight:"12px", color:"#ffff"}} />

                    </a>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        My Profile
                      </Link>
                      <p className="dropdown-item" onClick={logout}>
                        <span onClick={logout}>Log Out</span> <AiOutlineLogout />
                      </p>
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
