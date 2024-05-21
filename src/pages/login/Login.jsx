import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginApiResponse } from "../../redux/apiResponse";
import { useFormik } from "formik";
import * as Yup from "yup";
import { inputError } from "../../includes/formError/InputError";

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
    <>
   <div className="login_page_main_div">
   <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card shadow">
          <div className="card-title text-center border-bottom">
            <h2 className="p-3">Login</h2>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" name="email" id="email"{...formik.getFieldProps("email")} />
                {inputError(formik, "email")}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" name="password" id="password" {...formik.getFieldProps("password")} />
                {inputError(formik, "password")}
              </div>
              <div className="mb-4">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label htmlFor="remember" className="form-label">Remember Me</label>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn text-light main_bt">{loading ? "wait.." : "Login"}</button>
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
