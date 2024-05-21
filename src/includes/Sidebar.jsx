import { FcBusinessman, FcConferenceCall, FcHome, FcPaid, FcPicture, FcTimeline, FcViewDetails, FcVoicePresentation } from "react-icons/fc";
import { Link, NavLink } from "react-router-dom";

const dashboardIconStyle = {
  marginRight: "10px",
  fontSize: "20px",
  // float: "left",
};

const Sidebar = () => {
  return (
    <>
      <nav id="sidebar">
        <div className="sidebar_blog_1">
          <div className="sidebar-header">
            <div className="logo_section">
              <a href="index.html">
                <img
                  className="logo_icon img-responsive"
                  src="/logo/wrdlogo.png"
                  alt="#"
                />
              </a>
            </div>
          </div>
          <div className="sidebar_user_info">
            <div className="icon_setting"></div>
            <div className="user_profle_side">
              <div className="user_img">
                <img
                  className="img-responsive"
                  src="/logo/wrdlogo.png"
                  alt="#"
                />
              </div>
            </div>
            <div className="user_info">
                <h6>World Class Gourmet Foods</h6>
              </div>
          </div>
        </div>
        <div className="sidebar_blog_2">
          {/* <h4>World Class Gourmet Foods</h4> */}
          <ul className="list-unstyled components">
            <li>
              <NavLink to="/" >
                <FcHome style={dashboardIconStyle} />

                <span className="sidebar_tab__name_toggle">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/roles">
                <FcConferenceCall style={dashboardIconStyle} />
                <span className="sidebar_tab__name_toggle">Roles</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/category">
                <FcViewDetails style={dashboardIconStyle} />
                <span className="sidebar_tab__name_toggle">Category</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/sub-category">
                <FcTimeline style={dashboardIconStyle} />
                <span className="sidebar_tab__name_toggle">Sub Category</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/product">
                <FcPaid style={dashboardIconStyle} />
                <span className="sidebar_tab__name_toggle">Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/users">
                <FcBusinessman style={dashboardIconStyle} />
                <span className="sidebar_tab__name_toggle">Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact">
                <FcVoicePresentation style={dashboardIconStyle} />
                <span className="sidebar_tab__name_toggle">Contact</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
