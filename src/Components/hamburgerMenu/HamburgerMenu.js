import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HamburgerMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

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
                        Kies Hulp
                    </NavLink>
                    <NavLink
                        to="/partij-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        onClick={() => setIsOpen(false)}
                    >
                        Partij Pagina
                    </NavLink>
                    <NavLink
                        to="/standpunten-pagina"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                        onClick={() => setIsOpen(false)}
                    >
                        Standpunten Pagina
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;