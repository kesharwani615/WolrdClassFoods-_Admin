import "react-toastify/dist/ReactToastify.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes/Routes";


function App() {
  return useRoutes(routes);
};

export default App;






