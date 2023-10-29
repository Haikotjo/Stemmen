import React from 'react';
import styles from './StyledButton.module.scss';

const StyledButton = ({ label, onClick }) => {
    return (
        <button className={styles['styled-button']} onClick={onClick}>
            {label}
        </button>
    );
};

export default StyledButton;
