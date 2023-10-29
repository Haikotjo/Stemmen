import React, { useEffect, useState } from 'react';
import { getPositions } from '../../utils/utils';
import partiesData from '../../data/parties.json';
import positionsData from '../../data/positions.json';

function ElectionHelper() {
    const [selectedParties, setSelectedParties] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [positions, setPositions] = useState({});
    const [partyScores, setPartyScores] = useState({});
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [givenAnswers, setGivenAnswers] = useState({});
    const topics = Object.keys(positionsData);

    useEffect(() => {
        // Initialiseer de scores
        const initialScores = {};
        partiesData.partijen.forEach((party) => {
            initialScores[party] = 0;
        });
        setPartyScores(initialScores);

        // Ophalen van opgeslagen scores uit localStorage bij het laden van de component
        const storedScores = localStorage.getItem('partyScores');
        if (storedScores) {
            setPartyScores(JSON.parse(storedScores));
        }
    }, []);

    useEffect(() => {
        if (selectedParties.length > 0 && selectedTopic) {
            const newPositions = {};
            selectedParties.forEach((party) => {
                const position = getPositions(selectedTopic, party);
                newPositions[party] = position;
            });
            setPositions(newPositions);
        }
    }, [selectedParties, selectedTopic]);

    const togglePartySelection = (party) => {
        setSelectedParties((prevSelectedParties) =>
            prevSelectedParties.includes(party)
                ? prevSelectedParties.filter((p) => p !== party)
                : [...prevSelectedParties, party]
        );
    };

    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic);
    };

    const updateScore = (party, score) => {
        setPartyScores(prevScores => {
            const updatedScores = {
                ...prevScores,
                [party]: (prevScores[party] || 0) + score,
            };
            // Opslaan van de bijgewerkte scores in localStorage
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
        console.log(`Updated score for ${party}:`, (partyScores[party] || 0) + score);
    };

    const undoAnswer = (party) => {
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
        // Leeg de localStorage
        localStorage.removeItem('partyScores');

        // Reset de componenttoestand
        const initialScores = {};
        partiesData.partijen.forEach((party) => {
            initialScores[party] = 0;
        });
        setPartyScores(initialScores);
        setAnsweredQuestions({});
        setGivenAnswers({});
    };

    return (
        <div className="App">
            {partiesData.partijen.map((party) => (
                <button key={party} onClick={() => togglePartySelection(party)}>{party}</button>
            ))}
            {topics.map((topic) => (
                <button key={topic} onClick={() => handleTopicSelection(topic)}>Select {topic}</button>
            ))}
            {selectedParties.length > 0 && <h1>Selected Parties: {selectedParties.join(', ')}</h1>}
            {Object.keys(positions).map((party) => (
                <div key={party}>
                    <h1>{party}</h1>
                    <h3> {selectedTopic}:</h3>
                    <p>
                        {positions[party]}
                    </p>
                    <button disabled={answeredQuestions[`${selectedTopic}_${party}`]} onClick={() => updateScore(party, 1)}>Eens</button>
                    <button disabled={answeredQuestions[`${selectedTopic}_${party}`]} onClick={() => updateScore(party, 0)}>Neutraal</button>
                    <button disabled={answeredQuestions[`${selectedTopic}_${party}`]} onClick={() => updateScore(party, -1)}>Oneens</button>
                    {answeredQuestions[`${selectedTopic}_${party}`] && <button onClick={() => undoAnswer(party)}>Ongedaan Maken</button>}
                </div>
            ))}
            <div>
                <h2>Party Scores</h2>
                {Object.keys(partyScores).map((party) => (
                    <div key={party}>
                        {party}: {partyScores[party]}
                    </div>
                ))}
            </div>
            <button onClick={resetScores}>Reset Scores</button>
        </div>
    );
}

export default ElectionHelper;
