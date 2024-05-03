import { useRoutes } from "react-router-dom";
import { routes } from "./routes/Routes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const {user} = useSelector((state) => state.auth);
  // localStorage.setItem("world_class_user",JSON.stringify(user));

  useEffect(()=>{
  const world_class_user = JSON.parse(localStorage.getItem('world_class_user'));
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






