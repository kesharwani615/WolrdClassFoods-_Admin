const inputError = (formik,name) => {
    return (formik.touched[name] && formik.errors[name]) ? (<p  className="text-danger">{formik.errors[name]}</p>) : null;

  };



export {
    inputError
}