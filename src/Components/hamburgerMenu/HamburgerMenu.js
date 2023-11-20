import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import styles from './HamburgerMenu.module.scss'; // Import SCSS module for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome for icons
import { faBars } from '@fortawesome/free-solid-svg-icons'; // Import specific icon (hamburger menu)
import { useLanguage } from "../../context/LanguageContext"; // Import language context hook
import textData from "../../data/textData.json"; // Import text data for different languages

// Define the HamburgerMenu functional component
const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage menu open/close
    const menuRef = useRef(null); // Ref to the menu for detecting outside clicks
    const { language } = useLanguage(); // Retrieve current language from context
    const currentTextData = textData[language]; // Get text data for current language

    // Function to toggle the menu's open/close state
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Function to handle clicking outside the menu to close it
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // Effect hook for adding/removing event listener for outside clicks
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Empty dependency array means it runs once on mount

    return (
        // Menu container with ref attached
        <div className={styles.hamburgerMenu} ref={menuRef}>
            {/* Icon to open/close the menu */}
            <div className={styles.icon} onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} size="2x" /> {/* Hamburger icon */}
            </div>
            {/* Dropdown menu content */}
            {isOpen && (
                <div className={styles.dropdown}>
                    {/* Navigation links, dynamically rendered based on language */}
                    {/* NavLink used for navigation, with styles for active and default states */}
                    <NavLink
                        to="/kies-hulp"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        onClick={() => setIsOpen(false)}
                    >
                        {currentTextData.pages.electionHelper.name}
                    </NavLink>
                    <NavLink
                        to="/partij-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        onClick={() => setIsOpen(false)}
                    >
                        {currentTextData.pages.partiesPage.name}
                    </NavLink>
                    <NavLink
                        to="/standpunten-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        onClick={() => setIsOpen(false)}
                    >
                        {currentTextData.pages.positionsPage.name}
                    </NavLink>
                    <NavLink
                        to="/score-page"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        {currentTextData.pages.scorePage.name}
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
