import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import {getRandomImage} from "../../utils/utils";

const Modal = ({ isShowing, hide, children }) => {
    // Selecteer een willekeurige afbeelding wanneer de modal wordt getoond
    const randomImage = isShowing ? getRandomImage() : null;

    return isShowing ? ReactDOM.createPortal(
        <>
            <div className={styles.modalOverlay} onClick={hide} />
            <div className={styles.modalWrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        {/* Toon de willekeurige afbeelding */}
                        <img src={randomImage} alt="Header" className={styles.headerImage} />
                        <button type="button" className={styles.modalCloseButton} onClick={hide}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className={styles.modalContent}>
                        {children}
                    </div>
                </div>
            </div>
        </>, document.body
    ) : null;
};

export default Modal;