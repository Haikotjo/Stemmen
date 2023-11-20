import React, { createContext, useState, useEffect } from 'react';

// Create a new Context for managing scores and answered questions
export const ScoreContext = createContext();

// ScoreProvider component that will wrap around the app or components that need score context
export const ScoreProvider = ({ children }) => {
    // State for managing party scores
    const [partyScores, setPartyScores] = useState({});

    // State for managing answered questions
    const [answeredQuestions, setAnsweredQuestions] = useState({});

    // Effect for retrieving answered questions from localStorage on component mount
    useEffect(() => {
        const localAnsweredQuestions = localStorage.getItem('answeredQuestions');
        if (localAnsweredQuestions) {
            // Parse the stored string back into an object
            setAnsweredQuestions(JSON.parse(localAnsweredQuestions));
        }
    }, []); // The empty dependency array ensures this runs only once on mount

    // Effect for storing answered questions in localStorage when they change
    useEffect(() => {
        localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
    }, [answeredQuestions]); // Depend on answeredQuestions state

    // Effect for retrieving party scores from localStorage on component mount
    useEffect(() => {
        const localScores = localStorage.getItem('partyScores');
        if (localScores) {
            // Parse the stored string back into an object
            setPartyScores(JSON.parse(localScores));
        }
    }, []); // Runs only once on mount

    // Effect for storing party scores in localStorage when they change
    useEffect(() => {
        localStorage.setItem('partyScores', JSON.stringify(partyScores));
    }, [partyScores]); // Depend on partyScores state

    return (
        // Provide the score context to child components
        <ScoreContext.Provider value={{ partyScores, setPartyScores, answeredQuestions, setAnsweredQuestions }}>
            {children} {/* Render children components that will have access to score context */}
        </ScoreContext.Provider>
    );
};
