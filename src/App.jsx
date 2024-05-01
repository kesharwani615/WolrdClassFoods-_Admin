import "react-toastify/dist/ReactToastify.css";
import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./includes/Sidebar";
import Header from "./includes/Header";
import Dashboard from "./pages/Dashboard";
import Loader from "./includes/Loader/Loader";
import Footer from "./includes/Footer";
import Product from "./pages/product/Product";
import Errorpage from "./includes/Errorpage";

function App() {
  return (
    <>
      <HashRouter>
        <div class="full_container">
          <div class="inner_container">
            <Sidebar />
            <div id="content">
              <Header />
              <ScrollToTop />
              <ToastContainer />
              <Header />
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="*" element={<Errorpage />} />
                </Routes>
              </Suspense>
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </HashRouter>
    </>
  );
}

export default App;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
