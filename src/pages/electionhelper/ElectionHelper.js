import React, { useState, useEffect, useContext } from 'react';
import partiesData from '../../data/parties.json';
import positionsData from '../../data/positions.json';
import PartyList from "../../Components/partyList/PartyList";
import TopicList from "../../Components/topicList/TopicList";
import StyledButton from "../../Components/button/StyledButton";
import styles from "./ElectionHelper.module.scss";
import {getPartyImage, getPositions, getRandomImagePage} from "../../utils/utils";
import { ScoreContext } from "../../context/ScoreContext";
import useHandleAnswer from "../../hooks/useHandleAnswer";
import useUndoAnswer from "../../hooks/useUndoAnswer";
import useToggleParty from "../../hooks/useToggleParty";
import useHandleTopicSelection from "../../hooks/useHandleTopicSelection";
import useReset from "../../hooks/useReset";
import SelectedPartyItem from "../../Components/selectedPartyItem/SelectedPartyItem";
import {useLanguage} from "../../context/LanguageContext";

function ElectionHelper() {
    const [positions, setPositions] = useState({});
    const { language } = useLanguage();
    const currentPositionsData = positionsData[language] || positionsData.nl;
    const topics = Object.keys(currentPositionsData);

    const { selectedParties, togglePartySelection } = useToggleParty();
    const { partyScores, answeredQuestions } = useContext(ScoreContext);
    const { selectedTopic, handleTopicSelection } = useHandleTopicSelection();
    const handleReset = useReset();
    const handleAnswer = useHandleAnswer();
    const undoAnswer = useUndoAnswer();
    const randomHeaderImage =  getRandomImagePage();
    const [expandedItems, setExpandedItems] = useState({});

    const translations = {
        nl: {
            electionHelper: "KIES HULP",
            chooseParties: "Kies de partijen die je wilt vergelijken",
            chooseTopic: "Kies een onderwerp",
            selectedParties: "Geselecteerde Partijen:",
            noPositionAvailable: "Kies een onderwerp",
            agree: "Eens",
            disagree: "Oneens",
            neutral: "Neutraal"
        },
        en: {
            electionHelper:"ELECTION HELPER",
            chooseParties: "Choose the parties you want to compare",
            chooseTopic: "Choose a topic",
            selectedParties: "Selected Parties:",
            noPositionAvailable: "Choose a subject",
            agree: "Agree",
            disagree: "Disagree",
            neutral: "Neutral"
        }
    };

    const t = translations[language];
    const agree = t.agree;
    const disagree = t.disagree;
    const neutral = t.neutral;
    useEffect(() => {
        // Controleer of zowel geselecteerde partijen als een geselecteerd onderwerp aanwezig zijn
        if (selectedParties.length > 0 && selectedTopic) {
            const newPositions = {};
            selectedParties.forEach((party) => {
                // Controleer eerst of het geselecteerde onderwerp en de partij bestaan in de huidige taaldata
                if (currentPositionsData[selectedTopic] && currentPositionsData[selectedTopic][party]) {
                    newPositions[party] = currentPositionsData[selectedTopic][party];
                } else {
                    console.error(`Positie voor partij ${party} en onderwerp ${selectedTopic} niet gevonden in taal ${language}.`);
                    newPositions[party] = "Geen positie beschikbaar";
                }
            });
            setPositions(newPositions);
        }
    }, [selectedParties, selectedTopic, language, currentPositionsData]);

    const toggleItemExpansion = (party) => {
        setExpandedItems(prev => ({ ...prev, [party]: !prev[party] }));
    };

    return (
        <>
            <div className={styles.headerWrapper}>
                <img src={randomHeaderImage} alt="Header" className={styles.backgroundImage} />
                <h1 className={styles.headerText}>{t.electionHelper}</h1>
            </div>
            <div className={styles.electionHelperContainer}>
                <h1>{t.chooseParties}</h1>
                <PartyList
                    parties={partiesData.partijen}
                    selectedParties={selectedParties}
                    togglePartySelection={togglePartySelection}
                />

                <h1>{t.chooseTopic}</h1>
                <TopicList
                    topics={topics}
                    selectedTopic={selectedTopic}
                    handleTopicSelection={handleTopicSelection}
                />

                <div className={styles.selectedPartiesContainer}>
                    <h1>{t.selectedParties}</h1>
                    {selectedParties.map((party) => (
                        <SelectedPartyItem
                            key={`${language}_${party}`}
                            party={party}
                            partyScores={partyScores}
                            getPartyImage={getPartyImage}
                            positions={positions}
                            handleAnswer={handleAnswer}
                            undoAnswer={undoAnswer}
                            answeredQuestions={answeredQuestions}
                            selectedTopic={selectedTopic}
                            isExpanded={expandedItems[party]}
                            toggleExpansion={() => toggleItemExpansion(party)}
                            noPositionAvailable={t.noPositionAvailable}
                            agree={agree}
                            disagree={disagree}
                            neutral={neutral}
                        />
                    ))}
                </div>
            </div>
            <StyledButton label="Reset" onClick={handleReset} />
        </>
    );
}

export default ElectionHelper;
