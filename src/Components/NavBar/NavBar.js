import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu";

function NavBar() {
    console.log(styles);
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
                        Kies Hulp
                    </NavLink>

                    <NavLink
                        to="/partij-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        Partij Pagina
                    </NavLink>

                    <NavLink
                        to="/standpunten-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                    >
                        Standpunten Pagina
                    </NavLink>
                </div>
                <div className={styles.hamburgerMenu}>
                    <HamburgerMenu />  {/* Dit vervangt de normale navlinks op kleine schermen */}
                </div>
            </div>
        </div>
    );
}

export default NavBar;
