import React, { useEffect } from 'react';
import styles from './Modal.module.scss';
import { getRandomImage } from '../../utils/utils';
import StyledButton from "../button/StyledButton";

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
                    <StyledButton
                        label="&times;"
                        onClick={hide}
                        className={`${styles['styled-button']} ${styles.close}`}
                    />
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
