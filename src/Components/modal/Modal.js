import React, { useEffect } from 'react';
import styles from './Modal.module.scss';
import { getRandomImage } from '../../utils/utils';

const Modal = ({ isShowing, hide, children }) => {
    const randomImage = isShowing ? getRandomImage() : null;

    useEffect(() => {
        if (isShowing) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isShowing]);

    return isShowing ? (
        <div className={styles.modalOverlay} onClick={hide}>
            <div className={styles.modalContainer}>
                <div className={styles.modal}>
                    <button type="button" className={styles.closeButton} onClick={hide}>
                        &times;
                    </button>
                    {/*{randomImage && (*/}
                    {/*    <img src={randomImage} alt="Header" className={styles.headerImage} />*/}
                    {/*)}*/}
                    <div className={styles.modalContent}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Modal;
