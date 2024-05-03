import { ToastContainer } from "react-toastify";
import Sidebar from "../includes/Sidebar";
import { Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/product/Product";
import Login from "../pages/login/Login";
import Layout from "../outlet/Layout";
import Profile from "../pages/profile/Profile";
import Roles from "../pages/role/Roles";

// const isAuthenticated = true;

export const routes = (isAuthenticated) => {
  return [
    {
      path: '/',
      element: <Layout isAuthenticated={isAuthenticated}/>,
      children: [
        { path: '', element: <Dashboard /> },
        { path: '/roles', element: <Roles /> },
        { path: '/product', element: <Product /> },
        { path: '/profile', element: <Profile /> }
      ],
    },
    {
      path: '/login',
      element: <Layout isAuthenticated={isAuthenticated}/>
    }
  ];
}


