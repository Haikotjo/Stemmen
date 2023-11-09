// ScoreContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
    const [partyScores, setPartyScores] = useState({});
    const [answeredQuestions, setAnsweredQuestions] = useState({});

    useEffect(() => {
        // Opslaan naar lokale opslag bij wijziging van answeredQuestions
        localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
    }, [answeredQuestions]);

    useEffect(() => {
        // Ophalen van lokale opslag bij initialisatie
        const localScores = localStorage.getItem('partyScores');
        if (localScores) {
            setPartyScores(JSON.parse(localScores));
        }
    }, []);

    useEffect(() => {
        // Opslaan naar lokale opslag bij wijziging
        localStorage.setItem('partyScores', JSON.stringify(partyScores));
    }, [partyScores]);

    return (
        <ScoreContext.Provider value={{ partyScores, setPartyScores, answeredQuestions, setAnsweredQuestions }}>
            {children}
        </ScoreContext.Provider>
    );
};
