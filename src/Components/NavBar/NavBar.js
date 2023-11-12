import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import {useLanguage} from "../../context/LanguageContext";

function NavBar() {

    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        if (language === 'nl') {
            setLanguage('en');
        } else if (language === 'en') {
            setLanguage('nl');
        }
    };

    const setToKids = () => {
        setLanguage('kids');
    };

    // Object met linkteksten voor beide talen
    const linkTexts = {
        nl: {
            kiesHulp: "Kies Hulp",
            partijPagina: "De Partijen",
            standpuntenPagina: "Standpunten",
            testPagina: "Testpagina"
        },
        en: {
            kiesHulp: "Election Helper",
            partijPagina: "Party Page",
            standpuntenPagina: "Positions Page",
            testPagina: "Test Page"
        },
        kids: {
            kiesHulp: "Kies Hulpje",
            partijPagina: "De partijen",
            standpuntenPagina: "Standpunten",
            testPagina: "Testpagina"
        },
    };

    const currentLinkTexts = linkTexts[language];

    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <NavLink to="/">
                        <FontAwesomeIcon icon={faHome} color="white" size="2x" />
                    </NavLink>
                </div>
                <div className={styles.links}>
                    <NavLink
                        to="/kies-hulp"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        {currentLinkTexts.kiesHulp}
                    </NavLink>

                    <NavLink
                        to="/partij-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        {currentLinkTexts.partijPagina}
                    </NavLink>

                    <NavLink
                        to="/standpunten-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        {currentLinkTexts.standpuntenPagina}
                    </NavLink>
                    
                    <NavLink
                        to="/testpagina" // Voeg de link naar de testpagina toe
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        {currentLinkTexts.testPagina}
                    </NavLink>
                </div>
                <div className={styles.hamburgerMenu}>
                    <HamburgerMenu />  {/* Dit vervangt de normale navlinks op kleine schermen */}
                </div>
                <div onClick={toggleLanguage} className={styles.languageToggle}>
                    {language === 'nl' ? 'en' : 'nl'}
                </div>
                <div onClick={setToKids} className={styles.kidsToggle}>
                    Kids
                </div>
            </div>
        </div>
    );
}

export default NavBar;
