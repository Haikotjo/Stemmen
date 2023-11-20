import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from "../../context/LanguageContext"; // Import language context
import styles from './LanguageMenu.module.scss'; // Import SCSS module for styling

// Define the LanguageMenu functional component
const LanguageMenu = () => {
    const [isOpen, setIsOpen] = useState(false); // State to track if the menu is open
    const menuRef = useRef(null); // Ref for the menu to handle outside clicks
    const { language, setLanguage } = useLanguage(); // Access and set language from context

    // Object containing link texts for different languages
    const linkTexts = {
        nl: { language: "Taal" },
        en: { language: "Language" },
        kids: { language: "Taal" },
    };

    // Retrieve texts for the current language
    const currentLinkTexts = linkTexts[language];

    // Function to change the application language
    const toggleLanguage = (selectedLanguage) => {
        setLanguage(selectedLanguage); // Update language in context
    };

    // Function to toggle the menu open/closed
    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle menu open state
    };

    // Function to handle clicking outside of the menu
    const handleClickOutside = (event) => {
        // Close the menu if clicking outside of the menu element
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // Effect hook for handling outside clicks
    useEffect(() => {
        // Attach event listener for outside click
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Empty dependency array means it runs once on mount

    return (
        // Menu container with a ref
        <div className={styles.languageMenu} ref={menuRef}>
            {/* Clickable element to toggle the menu */}
            <div onClick={toggleMenu}>
                {/* Display current language or default text */}
                <h1 className={styles.icon}>{currentLinkTexts.language}</h1>
            </div>
            {/* Dropdown menu for language selection */}
            {isOpen && (
                <div className={styles.dropdown}>
                    {/* Language options with click handler to change language */}
                    {/* Active language is highlighted */}
                    <p
                        className={`${styles.languageToggle} ${styles.languageToggleNl} ${language === 'nl' ? styles.active : ''}`}
                        onClick={() => toggleLanguage('nl')}
                    >
                        NL
                    </p>
                    <p
                        className={`${styles.languageToggle} ${language === 'en' ? styles.active : ''}`}
                        onClick={() => toggleLanguage('en')}
                    >
                        EN
                    </p>
                    <p
                        className={`${styles.languageToggle} ${language === 'kids' ? styles.active : ''}`}
                        onClick={() => toggleLanguage('kids')}
                    >
                        KIDS
                    </p>
                </div>
            )}
        </div>
    );
};

export default LanguageMenu; // Export the component
