import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(
        // Lees de taal uit de local storage of val terug op 'nl'
        localStorage.getItem('language') || 'nl'
    );

    useEffect(() => {
        // Opslaan van de taal in local storage bij elke wijziging
        localStorage.setItem('language', language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
