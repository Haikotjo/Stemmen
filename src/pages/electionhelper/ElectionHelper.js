import React, { useState, useEffect, useContext } from 'react';
import partiesData from '../../data/parties.json';
import positionsData from '../../data/positions.json';
import PartyList from "../../Components/partyList/PartyList";
import TopicList from "../../Components/topicList/TopicList";
import StyledButton from "../../Components/button/StyledButton";
import styles from "./ElectionHelper.module.scss";
import { getPositions } from "../../utils/utils";
import { ScoreContext } from '../../context/ScoreContext'; // Zorg dat dit pad klopt!

function ElectionHelper() {
    const [selectedParties, setSelectedParties] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [positions, setPositions] = useState({});
    const { partyScores, setPartyScores, answeredQuestions, setAnsweredQuestions } = useContext(ScoreContext);
    const topics = Object.keys(positionsData);

    useEffect(() => {
        if (selectedParties.length > 0 && selectedTopic) {
            const newPositions = {};
            selectedParties.forEach((party) => {
                newPositions[party] = getPositions(selectedTopic, party);
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


    const handleAnswer = (party, topic, answer) => {
        // Eerst het vorige antwoord controleren en indien nodig de score aanpassen
        const previousAnswer = answeredQuestions[`${topic}_${party}`];
        setPartyScores(prevScores => {
            const newScores = { ...prevScores };
            // Als er al een antwoord is, pas de score aan
            if (previousAnswer) {
                if (previousAnswer === 'Eens') {
                    newScores[party] -= 1;
                } else if (previousAnswer === 'Oneens') {
                    newScores[party] += 1;
                }
            }
            // Voeg nu de nieuwe score toe
            if (answer === 'Eens') {
                newScores[party] = (newScores[party] || 0) + 1;
            } else if (answer === 'Oneens') {
                newScores[party] = (newScores[party] || 0) - 1;
            }
            return newScores;
        });

        // Update de answeredQuestions met het nieuwe antwoord
        setAnsweredQuestions(prevAnswers => ({ ...prevAnswers, [`${topic}_${party}`]: answer }));
    };

    const handleUndoAnswer = (party, topic) => {
        // Verwijder het antwoord en pas de score dienovereenkomstig aan
        const previousAnswer = answeredQuestions[`${topic}_${party}`];
        setPartyScores(prevScores => {
            const newScores = { ...prevScores };
            if (previousAnswer === 'Eens') {
                newScores[party] -= 1;
            } else if (previousAnswer === 'Oneens') {
                newScores[party] += 1;
            }
            return newScores;
        });

        // Verwijder het antwoord uit answeredQuestions
        setAnsweredQuestions(prevAnswers => {
            const newAnswers = { ...prevAnswers };
            delete newAnswers[`${topic}_${party}`];
            return newAnswers;
        });
    };


    const handleReset = () => {
        if (window.confirm("Weet je zeker dat je alles wilt resetten en opnieuw wilt beginnen?")) {
            setSelectedParties([]);
            setSelectedTopic(null);
            setPositions({});
            setAnsweredQuestions({});
            setPartyScores({});
        }
    };



    return (
        <>
            <div className={styles.electionHelperContainer}>
                <h1>Kies de partijen die je wilt vergelijken</h1>
                <PartyList
                    parties={partiesData.partijen}
                    selectedParties={selectedParties}
                    togglePartySelection={togglePartySelection}
                />
                <h1>Kies een onderwerp</h1>
                <TopicList
                    topics={topics}
                    selectedTopic={selectedTopic}
                    handleTopicSelection={handleTopicSelection}
                />
                {selectedParties.length > 0 && selectedTopic && (
                    <div>
                        <h1>Geselecteerde Partijen:</h1>
                        <p>{selectedParties.join(', ')}</p>
                        <h1>Geselecteerd Onderwerp:</h1>
                        <p>{selectedTopic}</p>
                        <h1>Posities:</h1>
                        {Object.keys(positions).map((party) => (
                            <div key={party}>
                                <p>{party}: {positions[party]}</p>
                                {/* Controleer of de vraag al is beantwoord */}
                                {answeredQuestions[`${selectedTopic}_${party}`] ? (
                                    // Als de vraag is beantwoord, toon de knop voor "ongedaan maken"
                                    <StyledButton
                                        label="Ongedaan maken"
                                        onClick={() => handleUndoAnswer(party, selectedTopic)}
                                    />
                                ) : (
                                    // Als de vraag niet is beantwoord, toon de knoppen voor "eens", "oneens" en "neutraal"
                                    <>
                                        <StyledButton label="Eens" onClick={() => handleAnswer(party, selectedTopic, 'Eens')} />
                                        <StyledButton label="Oneens" onClick={() => handleAnswer(party, selectedTopic, 'Oneens')} />
                                        <StyledButton label="Neutraal" onClick={() => handleAnswer(party, selectedTopic, 'Neutraal')} />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {/* Toon de score en beantwoorde vragen per partij */}
                <div>
                    <h1>Score per partij:</h1>
                    <ul>
                        {Object.keys(partyScores).map((party) => (
                            <li key={party}>{party}: {partyScores[party]}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h1>Aantal beantwoorde vragen per partij:</h1>
                    <ul>
                        {Object.keys(partyScores).map((party) => (
                            <li key={party}>{party}: {Object.keys(answeredQuestions).filter((key) => key.startsWith(`${selectedTopic}_${party}`)).length}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <StyledButton label="Reset" onClick={handleReset} />
        </>
    );
}

export default ElectionHelper;
