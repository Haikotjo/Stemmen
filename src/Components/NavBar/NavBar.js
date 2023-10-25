import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.icon}>
                    <Link to="/">
                        <FontAwesomeIcon icon={faHome} color="white" />
                    </Link>
                </div>
                <div className={styles.links}>
                    <Link to="/kies-hulp">Kies Hulp</Link>
                    <Link to="/partij-pagina">Partij Pagina</Link>
                    <Link to="/standpunten-pagina">Standpunten Pagina</Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
