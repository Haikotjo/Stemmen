import React, { createContext, useState, useContext } from 'react';

// Create a new Context for the mode of the application
const ModeContext = createContext();

// Custom hook to use the ModeContext, making it easier to access the mode state and updater function
export const useMode = () => useContext(ModeContext);

// ModeProvider component that will wrap around the app or components that need access to the mode context
export const ModeProvider = ({ children }) => {
    // State for managing the mode of the application, defaulting to 'volwassenen' (adults)
    const [mode, setMode] = useState('volwassenen'); // Options are 'volwassenen' or 'kinderen' (children)

    return (
        // Provide the mode context to child components
        <ModeContext.Provider value={{ mode, setMode }}>
            {children} {/* Render children components that will have access to mode context */}
        </ModeContext.Provider>
    );
};
