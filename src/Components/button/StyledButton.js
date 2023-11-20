import styles from './StyledButton.module.scss'; // Import the specific SCSS module for StyledButton

// Define the StyledButton functional component
// It accepts 'label', 'onClick', and 'className' as props
const StyledButton = ({ label, onClick, className }) => {
    // Render a button element
    return (
        // Apply className from the SCSS module and any additional className passed as a prop
        // If no additional className is provided, it defaults to an empty string
        <button className={`${styles['styled-button']} ${className || ''}`} onClick={onClick}>
            {label} {/* Display the label content within the button */}
        </button>
    );
};

export default StyledButton; // Export the StyledButton for use in other parts of the application
