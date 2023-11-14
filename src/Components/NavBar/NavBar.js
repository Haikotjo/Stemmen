import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";
import { useLanguage } from "../../context/LanguageContext";
import LanguageMenu from "../languageMenu/LanguageMenu";

function NavBar() {

    const { language, setLanguage } = useLanguage();

    // Object met linkteksten voor beide talen
    const linkTexts = {
        nl: {
            kiesHulp: "Kies Hulp",
            partijPagina: "De Partijen",
            standpuntenPagina: "Standpunten",
            scorePage: "Mijn Match"
        },
        en: {
            kiesHulp: "Election Helper",
            partijPagina: "Party Page",
            standpuntenPagina: "Positions Page",
            scorePage: "Best match"
        },
        kids: {
            kiesHulp: "Kies Hulpje",
            partijPagina: "De partijen",
            standpuntenPagina: "Standpunten",
            scorePage: "Mijn partij"
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
                        to="/score-page"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        {currentLinkTexts.scorePage}
                    </NavLink>

                </div>
                <div className={styles.hamburgerMenu}>
                    <HamburgerMenu />
                </div>
                <LanguageMenu label='Language'/>
            </div>
        </div>
    );
}

export default NavBar;
