import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; // Importing icons from react-icons
import styles from './Footer.module.scss'; // Importing SCSS module for styling

// Define the Footer functional component
const Footer = () => {
    return (
        // Render a footer element with a class from the SCSS module
        <footer className={styles.footer}>

            <div className={styles.icons}>
                {/* Display a footer text */}
                <p className={styles.footerText}> By Haiko Wierda</p>

                {/* Link to LinkedIn profile */}
                {/* Opens in a new tab and uses rel="noopener noreferrer" for security */}
                <a href="https://www.linkedin.com/in/haiko-wierda-89aa7412a/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin /> {/* LinkedIn icon */}
                </a>

                {/* Link to GitHub profile */}
                {/* Opens in a new tab and uses rel="noopener noreferrer" for security */}
                <a href="https://github.com/Haikotjo" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> {/* GitHub icon */}
                </a>

                {/* Mailto link for sending an email */}
                <a href="mailto:haikowierdaklusjes@gmail.com">
                    <FaEnvelope /> {/* Envelope icon for email */}
                </a>
            </div>
        </footer>
    );
};

export default Footer; // Export the Footer component for use in other parts of the application
