import React, { useEffect, useRef, useCallback } from 'react';
import styles from './Modal.module.scss';
import StyledButton from "../button/StyledButton";

// Modal component definition
// This component serves as a reusable modal overlay, which can display any content passed as children.
// Props:
// - isShowing: Boolean to control the visibility of the modal.
// - hide: Function to hide the modal.
// - children: The content to be displayed inside the modal.
const Modal = ({ isShowing, hide, children }) => {
    const modalRef = useRef(null);

    // useCallback to memorize the handleClickOutside function
    // This function is called on mouse down events to check if the click is outside the modal.
    // If so, it invokes the 'hide' function to close the modal.
    const handleClickOutside = useCallback((event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            hide();
        }
    }, [hide]); // 'hide' is added as a dependency

    useEffect(() => {
        // When the modal is showing, disable scrolling on the body and attach the event listener for outside clicks.
        // When the modal is not showing, enable scrolling and remove the event listener.
        if (isShowing) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.body.style.overflow = 'unset';
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup function to remove the event listener when the component is unmounted or updated.
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isShowing, handleClickOutside]); // Add 'handleClickOutside' to the dependencies list

    return isShowing ? (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modal} ref={modalRef}>
                    {/* Close button to hide the modal */}
                    <StyledButton
                        label="&times;"
                        onClick={hide}
                        className={`${styles['styled-button']} ${styles.close}`}
                    />
                    {/* Container for the content passed as children */}
                    <div className={styles.modalContent}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Modal;
