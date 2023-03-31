import PropTypes from 'prop-types';
import React, { useEffect } from "react";
import css from '../Modal/modal.module.css'

export const Modal = ({ closeModal, imageToShow, imageToShowAlt }) => {
    
    const keyToClose = (event) => {
        if (event.code === 'Escape') {
            closeModal();
        }
    }

    const handleClickOnBackdrop = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keyToClose, handleClickOnBackdrop)
        return () => {
            window.removeEventListener('keydown', keyToClose, handleClickOnBackdrop)
        }
    });

    return (
        <div onClick={handleClickOnBackdrop} className={css.Overlay} >
            <div className={css.Modal}>
                <img src={imageToShow} alt={imageToShowAlt} />
            </div>
        </div>
    )
    
}

Modal.propTypes = {
    imageToShow: PropTypes.string,
    imageToShowAlt: PropTypes.string,
    closeModal: PropTypes.func,
}