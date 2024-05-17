import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginApiResponse } from "../../redux/apiResponse";
import { useFormik } from "formik";
import * as Yup from "yup";
import { inputError } from "../../includes/formError/InputError";
import { ColorRing } from "react-loader-spinner";

const Login = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  console.log("loading", loading);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is Required"),
      password: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Password is Required"),
    }),
    onSubmit: (formData) => {
      console.log("values", formData);
      dispatch(
        loginApiResponse({ formData, toast, isNavigate:false })
      );
    },
  });

  return (
    // <>
    //   <div className="container">
    //     <div className="center verticle_center full_height">
    //       <div className="login_section">
    //         <div className="logo_login">
    //           <div className="center">
    //             <h3 style={{ color: "#ffff" }}>World Class Gourmet Foods</h3>
    //           </div>
    //         </div>
    //         <div className="login_form">
    //           <form onSubmit={formik.handleSubmit}>
    //             <div className="field">
    //               <label className="label_field">Email</label>
    //               <input
    //                 type="email"
    //                 name="email"
    //                 placeholder="E-mail"
    //                 {...formik.getFieldProps("email")}
    //               />
    //               {inputError(formik, "email")}
    //             </div>
    //             <div className="field">
    //               <label className="label_field">fname</label>
    //               <input
    //                 type="text"
    //                 name="password"
    //                 placeholder="password"
    //                 {...formik.getFieldProps("password")}
    //               />
    //               {inputError(formik, "password")}
    //             </div>
    //             <div className="field">
    //               <label className="label_field hidden">hidden label</label>
    //               <label className="form-check-label">
    //                 <input type="checkbox" className="form-check-input" />{" "}
    //                 Remember Me
    //               </label>
    //               <a className="forgot" href="">
    //                 Forgotten Password?
    //               </a>
    //             </div>
    //             <div className="field margin_0">
    //               <label className="label_field hidden">hidden label</label>
    //               <button type="submit" className="main_bt">
    //                 <ColorRing
    //                   visible={loading}
    //                   height="30"
    //                   width="30"
    //                     ariaLabel="color-ring-loading"
    //                   wrapperStyle={{}}
    //                   wrapperClass="color-ring-wrapper"
    //                   colors={[
    //                     "#e15b64",
    //                     "#f47e60",
    //                     "#f8b26a",
    //                     "#abbd81",
    //                     "#849b87",
    //                   ]}
    //                 />
    //                {loading ? "" : "Log In"}
    //               </button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>

    <>
   <div className="login_page_main_div">
   <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card shadow">
          <div class="card-title text-center border-bottom">
            <h2 class="p-3">Login</h2>
          </div>
          <div class="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" name="email" id="email"{...formik.getFieldProps("email")} />
                {inputError(formik, "email")}
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" id="password" {...formik.getFieldProps("password")} />
                {inputError(formik, "password")}
              </div>
              <div class="mb-4">
                <input type="checkbox" class="form-check-input" id="remember" />
                <label for="remember" class="form-label">Remember Me</label>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn text-light main_bt">{loading ? "wait.." : "Login"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
   </div>
    </>
  );
};

export default Login;
