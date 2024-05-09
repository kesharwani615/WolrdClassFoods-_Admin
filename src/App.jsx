import "react-responsive-modal/styles.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes/Routes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { API } from "./redux/api";
import {  ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const {user} = useSelector((state) => state.auth);

  useEffect(()=>{
    const world_class_user = JSON.parse(localStorage.getItem('world_class_user'));
    API.interceptors.request.use(
      (config) => {
        const token = (world_class_user?.accessToken) ? world_class_user?.accessToken : "";
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Do something with request error
        toast.error(JSON.stringify(error),{position:"top-right"});
        return Promise.reject(error);
      }
    );

  
  if(world_class_user?.accessToken && world_class_user?.refreshToken){
    const decodedToken = jwtDecode(world_class_user?.accessToken);
    setTimeout(() => {
      localStorage.removeItem('world_class_user');
      setIsAuthenticated(false);
    }, Number(decodedToken?.exp));
    setIsAuthenticated(true);
  } else {
    setIsAuthenticated(false);
  }
  });



  return(
    <>
    <ToastContainer />
      {useRoutes(routes(isAuthenticated))}
    </>
  )
};

export default App;






