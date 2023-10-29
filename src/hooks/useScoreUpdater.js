import { useState } from 'react';

const useScoreUpdater = (initialScores) => {
    const [partyScores, setPartyScores] = useState(initialScores);
    const [givenAnswers, setGivenAnswers] = useState({});
    const [answeredQuestions, setAnsweredQuestions] = useState({});

    const updateScore = (party, score, selectedTopic) => {
        setPartyScores(prevScores => {
            const updatedScores = {
                ...prevScores,
                [party]: (prevScores[party] || 0) + score,
            };
            localStorage.setItem('partyScores', JSON.stringify(updatedScores));
            return updatedScores;
        });
        setGivenAnswers(prevAnswers => ({
            ...prevAnswers,
            [`${selectedTopic}_${party}`]: score,
        }));
        setAnsweredQuestions(prevQuestions => ({
            ...prevQuestions,
            [`${selectedTopic}_${party}`]: true,
        }));
    };

    const undoAnswer = (party, selectedTopic) => {
        const undoScore = givenAnswers[`${selectedTopic}_${party}`] || 0;
        setPartyScores(prevScores => ({
            ...prevScores,
            [party]: (prevScores[party] || 0) - undoScore,
        }));
        setAnsweredQuestions(prevQuestions => {
            const newQuestions = { ...prevQuestions };
            delete newQuestions[`${selectedTopic}_${party}`];
            return newQuestions;
        });
        setGivenAnswers(prevAnswers => {
            const newAnswers = { ...prevAnswers };
            delete newAnswers[`${selectedTopic}_${party}`];
            return newAnswers;
        });
    };

    const resetScores = () => {
        localStorage.removeItem('partyScores');
        setPartyScores(initialScores);
        setAnsweredQuestions({});
        setGivenAnswers({});
    };

    return [partyScores, updateScore, undoAnswer, givenAnswers, answeredQuestions, resetScores];
};

export default useScoreUpdater;
