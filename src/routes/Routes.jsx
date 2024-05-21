import Dashboard from "../pages/Dashboard";
import Product from "../pages/product/Product";
import Layout from "../outlet/Layout";
import Profile from "../pages/profile/Profile";
import Roles from "../pages/role/Roles";
import Category from "../pages/category/Category";
import Contact from "../pages/contact/Contact";
import SubCategory from "../pages/category/SubCategory";
import SubCategoryViewPage from "../pages/category/SubCategoryViewPage";
import ContactDetails from "../pages/contact/ContactDetails";
import ProductDetails from "../pages/product/ProductDetails";
import User from "../pages/user/User";
import ChangePassword from "../pages/profile/ChangePassword";


export const routes = (isAuthenticated) => {
  return [
    {
      path: '/',
      element: <Layout isAuthenticated={isAuthenticated}/>,
      children: [
        { path: '', element: <Dashboard /> },
        { path: 'roles', element: <Roles /> },
        { path: 'category', element: <Category /> },
        { path: 'sub-category', element: <SubCategory /> },
        { path: 'sub-category/:id', element: <SubCategoryViewPage /> },
        { path: 'contact', element: <Contact /> },
        { path: 'contact/:id', element: <ContactDetails /> },
        { path: 'product', element: <Product /> },
        { path: 'product/:id', element: <ProductDetails /> },
        { path: 'profile', element: <Profile /> },
        { path: 'users', element: <User /> },
        { path: 'change-password', element: <ChangePassword /> }
      ],
    },
    {
      path: '/login',
      element: <Layout isAuthenticated={isAuthenticated}/>
    }
  ];
}


