import styles from './StyledButton.module.scss';

const StyledButton = ({ label, onClick, className }) => {
    return (
        <button className={`${styles['styled-button']} ${className || ''}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default StyledButton;
