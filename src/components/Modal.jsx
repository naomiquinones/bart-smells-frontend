import React from 'react';
import './Modal.css';


const Modal = ({ show, handleClose, children }) => {
  const toggleClass = show ? 'modal show' : 'modal hide';

  return (
    <div className={toggleClass} >
      <section className="modal-content">
      {children}
      <button type="button" className="close-button" onClick={handleClose}>
        close
      </button>
      </section>
    </div>
  );
}

export default Modal;