import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardApiResponse } from "../redux/apiResponse";
import { toast } from "react-toastify";


const Dashboard = () => {
  const dispatch = useDispatch();
  const { data,loading } = useSelector((state) => state.dashboard);

  useEffect(()=>{
    dispatch(
      fetchDashboardApiResponse({ toast })
    );
  },[])

  return (
    <>
      <div className="midde_cont">
        <div className="container-fluid">
          <div className="row column_title">
            <div className="col-md-12">
              <div className="page_title">
                <h2>Dashboard</h2>
              </div>
            </div>
          </div>
          <div className="row column1">
            <div className="col-md-6 col-lg-3">
              <div className="full counter_section margin_bottom_30">
                <div className="couter_icon">
                  <div>
                    <i className="fa fa-user yellow_color"></i>
                  </div>
                </div>
                <div className="counter_no">
                  <div>
                    <p className="total_no">{data?.user}</p>
                    <p className="head_couter">User</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="full counter_section margin_bottom_30">
                <div className="couter_icon">
                  <div>
                    <i className="fa fa-clock-o blue1_color"></i>
                  </div>
                </div>
                <div className="counter_no">
                  <div>
                    <p className="total_no">{data?.roles}</p>
                    <p className="head_couter">Roles</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="full counter_section margin_bottom_30">
                <div className="couter_icon">
                  <div>
                    <i className="fa fa-cloud-download green_color"></i>
                  </div>
                </div>
                <div className="counter_no">
                  <div>
                    <p className="total_no">{data?.product}</p>
                    <p className="head_couter">Products</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="full counter_section margin_bottom_30">
                <div className="couter_icon">
                  <div>
                    <i className="fa fa-comments-o red_color"></i>
                  </div>
                </div>
                <div className="counter_no">
                  <div>
                    <p className="total_no">{data?.productCategory}</p>
                    <p className="head_couter">Category</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="full counter_section margin_bottom_30">
                <div className="couter_icon">
                  <div>
                    <i className="fa fa-comments-o red_color"></i>
                  </div>
                </div>
                <div className="counter_no">
                  <div>
                    <p className="total_no">{data?.productSubCategory}</p>
                    <p className="head_couter">Sub Category</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="full counter_section margin_bottom_30">
                <div className="couter_icon">
                  <div>
                    <i className="fa fa-comments-o red_color"></i>
                  </div>
                </div>
                <div className="counter_no">
                  <div>
                    <p className="total_no">{data?.contacts}</p>
                    <p className="head_couter">Contacts</p>
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

export default Dashboard;
