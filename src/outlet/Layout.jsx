import React, { Suspense, useEffect } from 'react';
import Header from '../includes/Header';
import Sidebar from '../includes/Sidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../includes/Loader/Loader';
import Login from '../pages/login/Login';

const Layout = ({isAuthenticated}) => {
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const isAccessRoute = (isAccess) => {

    if(isAccess && (pathname !== '/login')) {
      return (
        <>
        <div className="full_container">
          <div className="inner_container">
            <Sidebar />
            <div id="content">
              <Header />
              <ScrollToTop />
              <Suspense fallback={<Loader />}><Outlet /></Suspense>
            </div>
          </div>
        </div>
    </>
      )
    } else if(isAccess && (pathname === '/login')){
     { navigate("/")}

    } else {
      return <Login />;
    }
  }


  return (
    <>
   {isAccessRoute(isAuthenticated)}
</>
  )
}

export default Layout;

function ScrollToTop() {
  const {pathname} = useLocation();
  
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);
  
    return null;
  }
