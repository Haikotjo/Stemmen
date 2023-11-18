import React, { useEffect, useRef, useCallback } from 'react';
import styles from './Modal.module.scss';
// import { getRandomImage } from '../../utils/utils';
import StyledButton from "../button/StyledButton";

const Modal = ({ isShowing, hide, children }) => {
    const modalRef = useRef(null);
    // const randomImage = isShowing ? getRandomImage() : null;

    // Gebruik useCallback om de handleClickOutside functie te memoïseren
    const handleClickOutside = useCallback((event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            hide();
        }
    }, [hide]); // 'hide' wordt hier als afhankelijkheid toegevoegd

    useEffect(() => {
        if (isShowing) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.body.style.overflow = 'unset';
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Opschonen
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isShowing, handleClickOutside]); // Voeg 'handleClickOutside' toe aan de afhankelijkhedenlijst

    return isShowing ? (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modal} ref={modalRef}>
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
