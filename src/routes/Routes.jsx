import { ToastContainer } from "react-toastify";
import Sidebar from "../includes/Sidebar";
import { Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/product/Product";
import Login from "../pages/login/Login";
import Layout from "../outlet/Layout";

// const isAuthenticated = true;

export const routes = (isAuthenticated) => {
  return[
    {
      path: '/',
      element: <Layout isAuthenticated={isAuthenticated}/>,
      children: [
        { path: '', element: <Dashboard /> },
        { path: '/product', element: <Product /> }
      ],
    },
    {
      path: '/login',
      element: <Layout isAuthenticated={isAuthenticated}/>
    }
  ];
}


