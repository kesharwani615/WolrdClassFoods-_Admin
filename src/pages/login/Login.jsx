import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import apiMethod from "../../redux/api";
import { useApiResponse } from "../../redux/apiResponse";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { inputError } from "../../includes/formError/InputError";
import { ColorRing } from "react-loader-spinner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);
  console.log("loading", loading);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: (formData) => {
      // alert(JSON.stringify(values, null, 2));
      console.log("values", formData);
      dispatch(
        useApiResponse({ method: apiMethod.LOGIN, formData, toast, navigate })
      );
    },
  });

  return (
    <>
      <div className="container">
        <div className="center verticle_center full_height">
          <div className="login_section">
            <div className="logo_login">
              <div className="center">
                {/* <img width="210" src="images/logo/logo.png" alt="#" /> */}
                <h3 style={{ color: "#ffff" }}>World Class Gourmet Foods</h3>
              </div>
            </div>
            <div className="login_form">
              <form onSubmit={formik.handleSubmit}>
                <div className="field">
                  <label className="label_field">Email</label>
                  <input
                    type="email"
                    //   id="email"
                    name="email"
                    placeholder="E-mail"
                    {...formik.getFieldProps("email")}
                  />
                  {inputError(formik, "email")}
                </div>
                <div className="field">
                  <label className="label_field">fname</label>
                  <input
                    type="text"
                    //   id="password"
                    name="password"
                    placeholder="password"
                    {...formik.getFieldProps("password")}
                  />
                  {inputError(formik, "password")}
                </div>
                <div className="field">
                  <label className="label_field hidden">hidden label</label>
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" />{" "}
                    Remember Me
                  </label>
                  <a className="forgot" href="">
                    Forgotten Password?
                  </a>
                </div>
                <div className="field margin_0">
                  <label className="label_field hidden">hidden label</label>
                  <button type="submit" className="main_bt">
                    <ColorRing
                      visible={loading}
                      height="30"
                      width="30"
                        ariaLabel="color-ring-loading"
                      wrapperStyle={{}}
                      wrapperClass="color-ring-wrapper"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                   {loading ? "" : "Log In"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
