import React, { createContext, useState, useContext } from 'react';

const ModeContext = createContext();

export const useMode = () => useContext(ModeContext);

export const ModeProvider = ({ children }) => {
    const [mode, setMode] = useState('volwassenen'); // 'volwassenen' of 'kinderen'

    return (
        <ModeContext.Provider value={{ mode, setMode }}>
            {children}
        </ModeContext.Provider>
    );
};
