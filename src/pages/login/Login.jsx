import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import apiMethod from "../../redux/api";
import { useApiResponse } from '../../redux/apiResponse';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate()

   useEffect( () => {
      dispatch(
         useApiResponse({method:apiMethod.LOGIN,formData:{email:"test@test.com",password: "Test@123"},toast,navigate})
      )
   },[]);

  return (
    <>
    <div className="container">
            <div className="center verticle_center full_height">
               <div className="login_section">
                  <div className="logo_login">
                     <div className="center">
                        {/* <img width="210" src="images/logo/logo.png" alt="#" /> */}
                        <h3 style={{color:"#ffff"}}>World Class Gourmet Foods</h3>
                     </div>
                  </div>
                  <div className="login_form">
                     <form>
                           <div className="field">
                              <label className="label_field">Email</label>
                              <input type="email" name="email" placeholder="E-mail" />
                           </div>
                           <div className="field">
                              <label className="label_field">Password</label>
                              <input type="password" name="password" placeholder="Password" />
                           </div>
                           <div className="field">
                              <label className="label_field hidden">hidden label</label>
                              <label className="form-check-label"><input type="checkbox" className="form-check-input" /> Remember Me</label>
                              <a className="forgot" href="">Forgotten Password?</a>
                           </div>
                           <div className="field margin_0">
                              <label className="label_field hidden">hidden label</label>
                              <button type='button' className="main_bt">Log In</button>
                           </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
    </>
  )
}

export default Login
