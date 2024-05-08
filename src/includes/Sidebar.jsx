import { FcCollect, FcNeutralTrading, FcPicture } from "react-icons/fc";
import { Link } from "react-router-dom";

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
                  src="images/logo/logo_icon.png"
                  alt="#"
                />
              </a>
            </div>
          </div>
          <div className="sidebar_user_info">
            <div className="icon_setting"></div>
            <div className="user_profle_side">
              {/* <div className="user_img">
                <img
                  className="img-responsive"
                  src="images/layout_img/user_img.jpg"
                  alt="#"
                />
              </div> */}
              <div className="user_info">
                <h6>WCGF</h6>
                {/* <p>
                  <span className="online_animation"></span> Online
                </p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar_blog_2">
          {/* <h4>World Class Gourmet Foods</h4> */}
          <ul className="list-unstyled components">
            <li>
              <Link to="/">
                <FcCollect style={dashboardIconStyle} />

                <span className="sidebar_tab__name_toggle">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/roles">
                <FcNeutralTrading style={dashboardIconStyle} />
                <span className="sidebar_tab__name_toggle">Roles</span>
              </Link>
            </li>
            <li>
              <Link to="/category">
                <FcNeutralTrading style={dashboardIconStyle} />
                <span className="sidebar_tab__name_toggle">Category</span>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <FcNeutralTrading style={dashboardIconStyle} />
                <span className="sidebar_tab__name_toggle">Contact</span>
              </Link>
            </li>
            <li>
              <Link to="/product">
                <FcNeutralTrading style={dashboardIconStyle} />
                <span className="sidebar_tab__name_toggle">Products</span>
              </Link>
            </li>
            <li>
            <Link to="/">
                <FcPicture style={dashboardIconStyle} />
                <span className="sidebar_tab__name_toggle">Tables</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
