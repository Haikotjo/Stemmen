import React, { useState, useEffect, useContext } from 'react';
import partiesData from '../../data/parties.json';
import positionsData from '../../data/positions.json';
import PartyList from "../../Components/partyList/PartyList";
import TopicList from "../../Components/topicList/TopicList";
import StyledButton from "../../Components/button/StyledButton";
import styles from "./ElectionHelper.module.scss";
import {getPartyImage, getPositions} from "../../utils/utils";
import { ScoreContext } from "../../context/ScoreContext";
import useHandleAnswer from "../../hooks/useHandleAnswer";
import useUndoAnswer from "../../hooks/useUndoAnswer";
import useToggleParty from "../../hooks/useToggleParty";
import useHandleTopicSelection from "../../hooks/useHandleTopicSelection";
import useReset from "../../hooks/useReset";
import SelectedPartyItem from "../../Components/selectedPartyItem/SelectedPartyItem";

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

                <div className={styles.selectedPartiesContainer}>
                    <h1>Geselecteerde Partijen:</h1>
                    {selectedParties.map((party) => (
                        <SelectedPartyItem
                            key={party}
                            party={party}
                            partyScores={partyScores}
                            getPartyImage={getPartyImage}
                            positions={positions}
                            handleAnswer={handleAnswer}
                            undoAnswer={undoAnswer}
                            answeredQuestions={answeredQuestions}
                            selectedTopic={selectedTopic}
                        />
                    ))}
                </div>

            </div>
            <StyledButton label="Reset" onClick={handleReset} />
        </>
    );
}

export default ElectionHelper;
