import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation links
import styles from './NavBar.module.scss'; // Import SCSS module for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome for icons
import { faHome } from '@fortawesome/free-solid-svg-icons'; // Import home icon
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu"; // Import HamburgerMenu component
import { useLanguage } from "../../context/LanguageContext"; // Import language context hook
import LanguageMenu from "../languageMenu/LanguageMenu"; // Import LanguageMenu component
import textData from "../../data/textData.json"; // Import text data for different languages

// Define the NavBar functional component
function NavBar() {
    const { language } = useLanguage(); // Retrieve current language from context
    const currentTextData = textData[language]; // Get text data for current language

    return (
        // Navbar container
        <div className={styles.navbar}>
            <div className={styles.container}>
                {/* Home icon with navigation link */}
                <div className={styles.icon}>
                    <NavLink to="/">
                        <FontAwesomeIcon icon={faHome} color="white" size="2x" />
                    </NavLink>
                </div>
                {/* Links for different pages */}
                <div className={styles.links}>
                    {/* NavLink used for navigation, with styles for active and default states */}
                    {/* Dynamically rendered based on language */}
                    <NavLink
                        to="/kies-hulp"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        {currentTextData.pages.electionHelper.name}
                    </NavLink>

                    <NavLink
                        to="/partij-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        {currentTextData.pages.partiesPage.name}
                    </NavLink>

                    <NavLink
                        to="/standpunten-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
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
                {/* Hamburger menu for smaller screens */}
                <div className={styles.hamburgerMenu}>
                    <HamburgerMenu />
                </div>
                {/* Language selection menu */}
                <LanguageMenu label='Language'/>
            </div>
        </div>
    );
}

export default NavBar; // Export the component
