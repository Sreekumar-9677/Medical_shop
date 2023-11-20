import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function MedicineListItem(props) {
  const user = useSelector((store) => store.auth.user);
  const token = user.token;

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  function deleteMedicine() {
    axios
      .delete(`https://medicalstore.mashupstack.com/api/medicine/${props.medicine.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
       
        setIsSuccessModalVisible(true);

     
        props.refresh();
      })
      .catch((error) => {
        console.error('Failed to delete medicine:', error);
      });
  }

  function handleCloseModal() {
    
    setIsSuccessModalVisible(false);
  }

  return (
    <div className="card">
      <div className="card-body">
        {props.medicine.name}
        <button className="btn btn-danger float-right" onClick={deleteMedicine}>
  <i className="fas fa-trash"></i> 
</button>

        <Link to={"/Medical/data/" + props.medicine.id + "/edit"} className="btn btn-secondary float-right">
  <i className="fas fa-edit"></i> 
</Link>

        <Link to={"/Medical/data/" + props.medicine.id} className="btn btn-success float-right">
  <i className="fas fa-eye"></i>
</Link>

      </div>
      <div
        className={`modal ${isSuccessModalVisible ? 'show' : ''}`}
        
        role="dialog"
        style={{ display: isSuccessModalVisible ? 'block' : 'none' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Success</h5>
              <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Medicine deleted successfully.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicineListItem;
