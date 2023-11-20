import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom for navigation
import styles from './PageDescriptionBlock.module.scss'; // Import SCSS module for styling

// Define the PageDescriptionBlock functional component
// It accepts 'route', 'description', and 'title' as props
const PageDescriptionBlock = ({ route, description, title }) => {
    return (
        // Render a Link component for navigation
        <Link to={route} className={`${styles.pageDescriptionBlock} ${styles.linkHover}`}>
            {/* Title of the page description block */}
            <h2 className={styles.pageTitle}>{title}</h2>
            {/* Description content of the page */}
            <div className={styles.pageDescription}>{description}</div>
        </Link>
    );
};

export default PageDescriptionBlock; // Export the component for use in other parts of the application
