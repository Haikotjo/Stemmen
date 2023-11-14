import React, { createContext, useState, useEffect } from 'react';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
    const [partyScores, setPartyScores] = useState({});
    const [answeredQuestions, setAnsweredQuestions] = useState({});

    // Ophalen van answeredQuestions van lokale opslag bij initialisatie
    useEffect(() => {
        const localAnsweredQuestions = localStorage.getItem('answeredQuestions');
        if (localAnsweredQuestions) {
            setAnsweredQuestions(JSON.parse(localAnsweredQuestions));
        }
    }, []);

    // Opslaan naar lokale opslag bij wijziging van answeredQuestions
    useEffect(() => {
        localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
    }, [answeredQuestions]);

    // Ophalen van partyScores van lokale opslag bij initialisatie
    useEffect(() => {
        const localScores = localStorage.getItem('partyScores');
        if (localScores) {
            setPartyScores(JSON.parse(localScores));
        }
    }, []);

    // Opslaan naar lokale opslag bij wijziging van partyScores
    useEffect(() => {
        localStorage.setItem('partyScores', JSON.stringify(partyScores));
    }, [partyScores]);

    return (
        <ScoreContext.Provider value={{ partyScores, setPartyScores, answeredQuestions, setAnsweredQuestions }}>
            {children}
        </ScoreContext.Provider>
    );
};
