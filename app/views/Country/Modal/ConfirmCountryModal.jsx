import React from 'react';
import Style from './ConfirmCountryModal.module.css';
import Button from '../Button/Button';
const ModalConfirm = (props) => {
  const {onClose, country, handleDeleteUserFromModal} = props;
  const confirmDelete = async() => {
          onClose();
          handleDeleteUserFromModal(country)
    };
    const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
        handleClose(); // Close the modal if click occurs outside modal content
      }
    };
    const handleClose = () => {
      onClose();
  }
  return (
    <div className={Style.Modal_box} onClick={handleOutsideClick}>
      <div className={Style.Modal}>
        <div className={Style.Modal_title}>
          <h3>Delete user</h3>
        </div>
        <div className={Style.Modal_body}>
            <div className='body-add-new'>
              Are you sure to delete this user, this action can't be undone!
              Do you want to delete <br/>
              <strong>Name: {country.name}</strong>
            </div>
        </div>
        <div className={Style.Modal_footer}>
        <div className={Style.Modal_footer_button}>
            <Button btnName="Close" handleClick={() => handleClose()}></Button>
          </div>
          <div className={Style.Modal_footer_button}>
            <Button btnName="Confirm" handleClick={() => confirmDelete()}></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm