import React, { useEffect, useState } from 'react';
import { getPositions } from '../../utils/utils';
import partiesData from '../../data/parties.json';
import positionsData from '../../data/positions.json';
import StyledButton from "../../Components/button/StyledButton";
import PartyList from "../../Components/partyList/PartyList";
import TopicList from "../../Components/topicList/TopicList";
import useInitialScores from "../../hooks/useInitialScores";

function ElectionHelper() {
    const [partyScores, setPartyScores] = useInitialScores(partiesData);
    const [selectedParties, setSelectedParties] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [positions, setPositions] = useState({});
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [givenAnswers, setGivenAnswers] = useState({});
    const topics = Object.keys(positionsData);

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
            <PartyList
                parties={partiesData.partijen}
                selectedParties={selectedParties}
                togglePartySelection={togglePartySelection}
            />
            <TopicList
                topics={topics}
                selectedTopic={selectedTopic}
                handleTopicSelection={handleTopicSelection}
            />
            {selectedParties.length > 0 && <h1>Selected Parties: {selectedParties.join(', ')}</h1>}
            {Object.keys(positions).map((party) => (
                <div key={party}>
                    <h1>{party}</h1>
                    <h3> {selectedTopic}:</h3>
                    <p>
                        {positions[party]}
                    </p>
                    <StyledButton disabled={answeredQuestions[`${selectedTopic}_${party}`]} label="Eens" onClick={() => updateScore(party, 1)} />
                    <StyledButton disabled={answeredQuestions[`${selectedTopic}_${party}`]} label="Neutraal" onClick={() => updateScore(party, 0)} />
                    <StyledButton disabled={answeredQuestions[`${selectedTopic}_${party}`]} label="Oneens" onClick={() => updateScore(party, -1)} />
                    {answeredQuestions[`${selectedTopic}_${party}`] && <StyledButton label="Ongedaan Maken" onClick={() => undoAnswer(party)} />}
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
            <StyledButton label="Reset Scores" onClick={resetScores} />
        </div>
    );
}

export default ElectionHelper;
