import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children }) => {
    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="modal-overlay">
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-header">
                    </div>
                    <div className="modal-body">{children}</div>
                    <a href="#" onClick={handleCloseClick}>Cancel</a>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
    );
};

export default Modal