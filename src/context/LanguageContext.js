import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a new Context for language
const LanguageContext = createContext();

// Custom hook to use the LanguageContext
export const useLanguage = () => useContext(LanguageContext);

// LanguageProvider component that will wrap around the app or components that need language context
export const LanguageProvider = ({ children }) => {
    // State for managing language, initialized from localStorage or defaulting to 'nl'
    const [language, setLanguage] = useState(
        localStorage.getItem('language') || 'nl' // Retrieve saved language or default to 'nl'
    );

    useEffect(() => {
        // Side effect to save language preference to localStorage whenever it changes
        localStorage.setItem('language', language); // Store the current language in localStorage
    }, [language]); // Depend on the language state

    return (
        // Provide the language context to components
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children} {/* Render children components */}
        </LanguageContext.Provider>
    );
};
