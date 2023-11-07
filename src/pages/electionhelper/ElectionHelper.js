import React, { useEffect, useState } from 'react';
import {getPositions, getRandomImagePage} from '../../utils/utils';
import partiesData from '../../data/parties.json';
import positionsData from '../../data/positions.json';
import StyledButton from "../../Components/button/StyledButton";
import PartyList from "../../Components/partyList/PartyList";
import TopicList from "../../Components/topicList/TopicList";
import useScoreUpdater from "../../hooks/useScoreUpdater";
import PartyScores from "../../Components/partyScores/PartyScores";
import styles from "./ElectionHelper.module.scss";

function ElectionHelper() {
    const initialScores = {}; // Je kunt dit ook vanuit partiesData genereren als dat nodig is
    const [partyScores, updateScore, undoAnswer, answeredQuestions, resetScores] = useScoreUpdater(initialScores);
    const [selectedParties, setSelectedParties] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [positions, setPositions] = useState({});
    const topics = Object.keys(positionsData);
    const randomHeaderImage =  getRandomImagePage();

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

    return (
        <>
            <div className={styles.headerWrapper}>
                <img src={randomHeaderImage} alt="Header" className={styles.backgroundImage} />
                <h1 className={styles.headerText}>KIES HULP</h1>
            </div>

            <div className={styles.container}>

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
                        {!answeredQuestions[`${selectedTopic}_${party}`] && (
                            <>
                                <StyledButton label="Eens" onClick={() => updateScore(party, 1, selectedTopic)} />
                                <StyledButton label="Neutraal" onClick={() => updateScore(party, 0, selectedTopic)} />
                                <StyledButton label="Oneens" onClick={() => updateScore(party, -1, selectedTopic)} />
                            </>
                        )}
                        {answeredQuestions[`${selectedTopic}_${party}`] && <StyledButton label="Ongedaan Maken" onClick={() => undoAnswer(party, selectedTopic)} />}
                    </div>
                ))}
                <PartyScores partyScores={partyScores} />
                <StyledButton label="Reset Scores" onClick={resetScores} />
            </div>
        </>
    );
}

export default ElectionHelper;
