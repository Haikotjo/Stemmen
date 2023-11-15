import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import styles from './Footer.module.scss'; // Importeer de SCSS-module

const Footer = () => {
    return (
        <footer className={styles.footer}>

            <div className={styles.icons}>
                <p className={styles.footerText}> By Haiko Wierda</p>
                <a href="https://www.linkedin.com/in/haiko-wierda-89aa7412a/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
                <a href="https://github.com/Haikotjo" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
                <a href="mailto:haikowierdaklusjes@gmail.com">
                    <FaEnvelope />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
