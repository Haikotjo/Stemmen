import React, {useEffect, useRef, useState} from 'react';
import { useLanguage } from "../../context/LanguageContext";
import styles from './LanguageMenu.module.scss';

const LanguageMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const { language, setLanguage } = useLanguage();

    const linkTexts = {
        nl: {
            language: "Taal"
        },
        en: {
            language: "Language"
        },
        kids: {
            language: "Taal"
        },
    };

    const currentLinkTexts = linkTexts[language];

    const toggleLanguage = (selectedLanguage) => {
        setLanguage(selectedLanguage);
    };

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
        <div className={styles.languageMenu} ref={menuRef}>
            <div onClick={toggleMenu}>
                <h1 className={styles.icon}>{currentLinkTexts.language}</h1>
            </div>
            {isOpen && (
                <div className={styles.dropdown}>
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

export default LanguageMenu;
