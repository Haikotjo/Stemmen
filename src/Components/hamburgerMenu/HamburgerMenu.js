import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HamburgerMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {useLanguage} from "../../context/LanguageContext";

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const { language } = useLanguage(); // Gebruik de taalcontext

    // Object met linkteksten voor beide talen
    const linkTexts = {
        nl: {
            kiesHulp: "Kies Hulpje",
            partijPagina: "De Partijen",
            standpuntenPagina: "Standpunten"
        },
        en: {
            kiesHulp: "Election Helper",
            partijPagina: "Party Page",
            standpuntenPagina: "Positions Page"
        },
        kids: {
            kiesHulp: "Kies Hulp",
            partijPagina: "De Partijen",
            standpuntenPagina: "Standpunten"
        }
    };

    // Haal de teksten voor de huidige taal op
    const currentLinkTexts = linkTexts[language];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.hamburgerMenu} ref={menuRef}>
            <div className={styles.icon} onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} size="2x" />
            </div>
            {isOpen && (
                <div className={styles.dropdown}>
                    <NavLink
                        to="/kies-hulp"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        onClick={() => setIsOpen(false)}
                    >
                        {currentLinkTexts.kiesHulp}
                    </NavLink>
                    <NavLink
                        to="/partij-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        onClick={() => setIsOpen(false)}
                    >
                        {currentLinkTexts.partijPagina}
                    </NavLink>
                    <NavLink
                        to="/standpunten-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        onClick={() => setIsOpen(false)}
                    >
                        {currentLinkTexts.standpuntenPagina}
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
