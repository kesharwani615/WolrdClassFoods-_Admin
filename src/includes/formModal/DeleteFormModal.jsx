import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Modal } from 'react-responsive-modal';

const DeleteFormModal = ({handleDelete, itemId, loading,isDeleteOpen = false}) => {
    const [open, setOpen] = useState(false);

    useEffect(()=>{
      setOpen(isDeleteOpen);
  },[isDeleteOpen])

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onDelete = () => {
    handleDelete(itemId);
  }



  return (
    <>
    <RiDeleteBin6Line onClick={onOpenModal} style={{color:"red", cursor:"pointer", fontSize:"20px"}} title="delete" /> 


    <Modal open={open}
     onClose={onCloseModal}
      center
      classNames={{
         modal:"customModalSmall"
        }}
      >
      <h4>{loading ? "we are deleting this item" : "Are you sure you want to delete this item?"}</h4>
      <div style={{display:"flex",justifyContent:"space-evenly"}}>
      <button className="btn btn-primary" onClick={onCloseModal} >Cancel</button>
      { loading ? <button type="submit" className="btn btn-danger">wait...</button> : <button className="btn btn-danger" onClick={onDelete}>Delete</button>}
      </div>
    </Modal>
  </>
  )
}

export default DeleteFormModal
