import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { inputError } from "../formError/InputError";
import { convertFileToImageUrl } from "../../utils";

const AddFormModal = ({ inputName,formik, loading,modalType, isOpen = false }) => {
  const [open, setOpen] = React.useState(false);
  const [showChooseImage, setShowChooseImage] = useState([]);

  
  useEffect(()=>{
      setOpen(isOpen);
      if(!isOpen){
        setShowChooseImage([])
        formik.formik.resetForm();
      }
  },[isOpen])

const selectOptionMap = (list) => {
  return list?.map((item, index) => {
    return ( <option key={index} value={item?._id}>{item?.categoryName}</option>)
  })
};



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
              
              {
                (typevalue?.type === "email") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><input  type={typevalue?.type} name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}/> </>)
               : (typevalue?.type === "number") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><input  type={typevalue?.type} name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}/> </>)
               : (typevalue?.type === "text-area") ? (<><p><label htmlFor="descriptionText">{typevalue?.label}</label></p><textarea id="descriptionText" cols="120" {...formik.formik.getFieldProps(typevalue?.keyName)}></textarea></>)
              : (typevalue?.type === "file") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><input type={typevalue?.type} name={typevalue?.keyName} className="form-control" onChange={(e) =>handleImageChange(e,typevalue?.keyName)} /> {(showChooseImage && showChooseImage.length) ? showChooseImage.map((imgUrl)=><img src={imgUrl} height={100} width={100} />) : ""} </>)
              : (typevalue?.type === "select-options") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><select name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}><option value="">select category</option>{selectOptionMap(formik?.list)}</select>  </>)
              : <><label htmlFor="descriptionText">{typevalue?.label}</label><input  type={typevalue?.type} name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}
              /> </>
              }
              {inputError(formik.formik, typevalue?.keyName)}
            </div>
          ))
        );
      case 2:
        return (
          inputType &&
          inputType?.length &&
          (inputType).map((typevalue, index) => (
            <div className="form-group col-md-6" key={index}>
            {
                (typevalue?.type === "email") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><input  type={typevalue?.type} name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}/> </>)
               : (typevalue?.type === "number") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><input  type={typevalue?.type} name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}/> </>)
               : (typevalue?.type === "text-area") ? (<><p><label htmlFor="descriptionText">{typevalue?.label}</label></p><textarea id="descriptionText" cols="120" {...formik.formik.getFieldProps(typevalue?.keyName)}></textarea></>)
              : (typevalue?.type === "file") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><input type={typevalue?.type} name={typevalue?.keyName} className="form-control" onChange={(e) =>handleImageChange(e,typevalue?.keyName)} /> {(showChooseImage && showChooseImage.length) ? showChooseImage.map((imgUrl)=><img src={imgUrl} height={100} width={100} />) : ""} </>)
               : (typevalue?.type === "select-options") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><select name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}><option value="">select category</option>{selectOptionMap(formik?.list)}</select>  </>)
              : <><label htmlFor="descriptionText">{typevalue?.label}</label><input  type={typevalue?.type} name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}
              /> </>
              }
              {inputError(formik.formik, typevalue?.keyName)}
            </div>
          ))
        );
      case 3:
        return (
          inputType &&
          inputType?.length &&
          (inputType).map((typevalue, index) => (
            <div className="form-group col-md-4" key={index}>
            {
                (typevalue?.type === "email") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><input  type={typevalue?.type} name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}/> </>)
               : (typevalue?.type === "number") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><input  type={typevalue?.type} name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}/> </>)
               : (typevalue?.type === "text-area") ? (<><p><label htmlFor="descriptionText">{typevalue?.label}</label></p><textarea id="descriptionText" cols="120" {...formik.formik.getFieldProps(typevalue?.keyName)}></textarea></>)
              : (typevalue?.type === "file") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><input type={typevalue?.type} name={typevalue?.keyName} className="form-control" onChange={(e) =>handleImageChange(e,typevalue?.keyName)} /> {(showChooseImage && showChooseImage.length) ? showChooseImage.map((imgUrl)=><img src={imgUrl} height={100} width={100} />) : ""} </>)
              : (typevalue?.type === "select-options") ? (<><label htmlFor="descriptionText">{typevalue?.label}</label><select name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}><option value="">select category</option>{selectOptionMap(formik?.list)}</select></>)
              : <><label htmlFor="descriptionText">{typevalue?.label}</label><input  type={typevalue?.type} name={typevalue?.keyName} className="form-control" {...formik.formik.getFieldProps(typevalue?.keyName)}
              /> </>
              }
              {inputError(formik.formik, typevalue?.keyName)}
            </div>
          ))
        );
    }
   })
  };

  const handleImageChange = (event,keyName) => {
    const file = event.target.files[0];
    const imgUrl = convertFileToImageUrl(event);
      setShowChooseImage(imgUrl);
    formik.formik.setFieldValue(keyName, file);
  };

  return (
    <>
      <button className="add__modal_button" onClick={() => setOpen(true)}>
        Add
      </button>

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
            <h5 className="card-title">Add {modalType}</h5>
            {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
            <form onSubmit={formik.formik.handleSubmit}>
              <div className="form-row">
                    <>
                      {printsAllInputFields(inputName)}
                    </>
              </div>

              { loading ? <button type="submit" className="btn btn-primary">wait...</button> : <button type="submit" className="btn btn-primary">Save</button>}
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddFormModal;
