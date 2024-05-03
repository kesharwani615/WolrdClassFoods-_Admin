import { useRoutes } from "react-router-dom";
import { routes } from "./routes/Routes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { API } from "./redux/api";
import { toast } from "react-toastify";



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


  
  console.log('world_class_user',world_class_user?.refreshToken);
  if(world_class_user?.accessToken && world_class_user?.refreshToken){
    console.log('11');
    setIsAuthenticated(true);
  } else {
    console.log('22');
    setIsAuthenticated(false);
  }
  });

  return useRoutes(routes(isAuthenticated));
};

export default App;






