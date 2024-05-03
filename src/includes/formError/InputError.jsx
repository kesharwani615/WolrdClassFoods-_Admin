const inputError = (formik,name) => {
    return (formik.touched[name] && formik.errors[name]) ? (<p>{formik.errors[name]}</p>) : null;
  };



export {
    inputError
}