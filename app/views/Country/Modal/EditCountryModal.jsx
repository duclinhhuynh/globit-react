import React,{useState, useEffect} from 'react';
import Style from './EditCountryModal.module.css'

const EditCountryModal = ({ onClose, country, onSaveChanges }) => {
  const [editedCountry, setEditedCountry] = useState({ ...country });

  useEffect(() => {
      setEditedCountry({ ...country });
  }, [country]);

  const handleClose = () => {
      onClose();
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedCountry(prevState => ({
          ...prevState,
          [name]: value
      }));
  };
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
        handleClose(); 
    }
};
  const handleEdit = () => {
      onSaveChanges(editedCountry);
  };
    return (
    <div className={Style.Modal_box} onClick={handleOutsideClick}>
      <div className={Style.Modal}>
        <div className={Style.Modal_title}>
          <h3>Edit user</h3>
        </div>
        <div className={Style.Modal_body}>
                    <form className={Style.Modal_body_form}>
                        <div className={Style.Modal_body_form_item}>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editedCountry.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={Style.Modal_body_form_item}>
                            <label>Code:</label>
                            <input
                                type="text"
                                name="code"
                                value={editedCountry.code}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={Style.Modal_body_form_item}>
                            <label>Description:</label>
                            <input
                                type="text"
                                name="des"
                                value={editedCountry.description}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
        </div>
        <div className={Style.Modal_footer}>
          <button onClick={handleClose}>Close</button>
          <button onClick={handleEdit}>Confirm</button>
        </div>
      </div>
    </div>
    );
};

export default EditCountryModal;
