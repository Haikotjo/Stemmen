import React, {useState, useEffect, useContext} from 'react';
import partiesData from '../../data/parties.json';
import positionsData from '../../data/positions.json';
import PartyList from "../../Components/partyList/PartyList";
import TopicList from "../../Components/topicList/TopicList";
import StyledButton from "../../Components/button/StyledButton"; // Importeer StyledButton
import styles from "./ElectionHelper.module.scss";
import { getPositions } from "../../utils/utils";
import {ScoreContext} from "../../context/ScoreContext";
import useHandleAnswer from "../../hooks/useHandleAnswer";
import useUndoAnswer from "../../hooks/useUndoAnswer";
import useToggleParty from "../../hooks/useToggleParty";
import useHandleTopicSelection from "../../hooks/useHandleTopicSelection";
import useReset from "../../hooks/useReset";

function ElectionHelper() {
    const [positions, setPositions] = useState({});
    const topics = Object.keys(positionsData);

    const { selectedParties, togglePartySelection } = useToggleParty();
    const { partyScores, answeredQuestions } = useContext(ScoreContext);
    const { selectedTopic, handleTopicSelection } = useHandleTopicSelection();
    const handleReset = useReset();
    const handleAnswer = useHandleAnswer();
    const undoAnswer = useUndoAnswer();

    useEffect(() => {
        if (selectedParties.length > 0 && selectedTopic) {
            const newPositions = {};
            selectedParties.forEach((party) => {
                const position = getPositions(selectedTopic, party); // Implementeer getPositions-functie om de positie op te halen
                newPositions[party] = position;
            });
            setPositions(newPositions);
        }
    }, [selectedParties, selectedTopic]);

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
                                        onClick={() => undoAnswer(party, selectedTopic)}
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
            </div>
            <StyledButton label="Reset" onClick={handleReset} />
        </>
    );
}

export default ElectionHelper;
