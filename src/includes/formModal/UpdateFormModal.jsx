import React, { useEffect } from "react";
// import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { inputError } from "../formError/InputError";
import { FaEdit } from "react-icons/fa";

const UpdateFormModal = ({ inputName,formik, loading, onPatchValueHandler,currentValue, isOpen = false }) => {
  const [open, setOpen] = React.useState(false);


  const onClickHandler = () => {
    onPatchValueHandler(currentValue);
     setOpen(true)
  };
 

  useEffect(()=>{
      if(!isOpen){
        setOpen(isOpen);
      }
  },[isOpen])


  const printsAllInputFields = (inputName) => {
   return inputName.map((inputType, index) => {
    const numberOfKeys = Number(Object.keys(inputType)?.length);
    switch (numberOfKeys) {
      case 1:
        return (
          inputType &&
          inputType?.length &&
          (inputType).map((typevalue,index) => (
            <div className="form-group col-md-12" key={index}>
              <label htmlFor="inputEmail4">{typevalue?.label}</label>
              <input
                type={typevalue?.type}
                name={typevalue?.keyName}
                className="form-control"
                {...formik.getFieldProps(typevalue?.keyName)}
              />
              {inputError(formik, typevalue?.keyName)}
            </div>
          ))
        );
      case 2:
        return (
          inputType &&
          inputType?.length &&
          (inputType).map((typevalue, index) => (
            <div className="form-group col-md-6" key={index}>
              <label htmlFor="inputEmail4">{typevalue?.label}</label>
              <input
                type={typevalue?.type}
                name={typevalue?.keyName}
                className="form-control"
                {...formik.getFieldProps(typevalue?.keyName)}
              />
              {inputError(formik, typevalue?.keyName)}
            </div>
          ))
        );

      default:
        return (
          inputType &&
          inputType?.length &&
          (inputType).map((typevalue, index) => (
            <div className="form-group col-md-6" key={index}>
              <label htmlFor="inputEmail4">{typevalue?.label}</label>
              <input
                type={inputType?.type}
                name={inputType?.keyName}
                className="form-control"
                {...formik.getFieldProps(inputType?.keyName)}
              />
              {inputError(formik, inputType?.keyName)}
            </div>
          ))
        );
    }
   })
  };


  return (
    <>
      <FaEdit onClick={onClickHandler} style={{color:"green", cursor:"pointer", fontSize:"20px", marginRight:"4px"}} title="edit" />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOut: "customLeaveOverlayAnimation",
          modalAnimationIn: "customEnterModalAnimation",
          modalAnimationOut: "customLeaveModalAnimation",
          modal:
            Number(inputName[0]?.length) > 1
              ? "customModallarge"
              : "customModalSmall",
        }}
        animationDuration={800}
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Update Role</h5>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-row">
                    <>
                      {printsAllInputFields(inputName)}
                    </>
              </div>

              { loading ? <button type="submit" className="btn btn-primary">saving...</button> : <button type="submit" className="btn btn-primary">Save</button>}
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateFormModal;

