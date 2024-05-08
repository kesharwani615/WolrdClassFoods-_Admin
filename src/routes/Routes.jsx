import Dashboard from "../pages/Dashboard";
import Product from "../pages/product/Product";
import Layout from "../outlet/Layout";
import Profile from "../pages/profile/Profile";
import Roles from "../pages/role/Roles";
import Category from "../pages/category/Category";
import Contact from "../pages/contact/Contact";


export const routes = (isAuthenticated) => {
  return [
    {
      path: '/',
      element: <Layout isAuthenticated={isAuthenticated}/>,
      children: [
        { path: '', element: <Dashboard /> },
        { path: '/roles', element: <Roles /> },
        { path: '/category', element: <Category /> },
        { path: '/contact', element: <Contact /> },
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


