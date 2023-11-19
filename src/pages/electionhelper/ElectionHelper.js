// Import necessary libraries and components
import React, {useState, useEffect, useContext, useRef} from 'react';
import {Link} from "react-router-dom";
import {useLanguage} from "../../context/LanguageContext";
import { ScoreContext } from "../../context/ScoreContext";
import PageHeader from "../../Components/pageHeader/PageHeader";
import PartyList from "../../Components/partyList/PartyList";
import TopicList from "../../Components/topicList/TopicList";
import SelectedPartyItem from "../../Components/selectedPartyItem/SelectedPartyItem";
import ScrollComponent from "../../Components/scrollComponent/ScrollComponent";
import StyledButton from "../../Components/button/StyledButton";
import useHandleAnswer from "../../hooks/useHandleAnswer";
import useUndoAnswer from "../../hooks/useUndoAnswer";
import useToggleParty from "../../hooks/useToggleParty";
import useHandleTopicSelection from "../../hooks/useHandleTopicSelection";
import useReset from "../../hooks/useReset";
import textData from "../../data/textData.json";
import positionsData from '../../data/positions.json';
import partiesData from '../../data/parties.json';
import {getPartyImage, getRandomImagePage} from "../../utils/utils";
import styles from "./ElectionHelper.module.scss";

// ElectionHelper component definition
function ElectionHelper() {
    // State hooks for positions and expanded items
    const [positions, setPositions] = useState({});
    const [expandedItems, setExpandedItems] = useState({});

    // Context hooks to access global language and score data
    const { language } = useLanguage();
    const { partyScores, answeredQuestions } = useContext(ScoreContext);

    // Effect hook to update positions based on selected parties and topics
    const { selectedParties, togglePartySelection } = useToggleParty();
    const { selectedTopic, handleTopicSelection } = useHandleTopicSelection();
    const handleAnswer = useHandleAnswer();
    const undoAnswer = useUndoAnswer();
    const handleReset = useReset();

    // Ref hook for the topic list
    const topicListRef = useRef(null);

    // Variables for current language data and content
    const currentPositionsData = positionsData[language] || positionsData.nl;
    const topics = Object.keys(currentPositionsData);
    const textContent = textData[language];
    const randomHeaderImage =  getRandomImagePage();
    const agree = textContent.agree;
    const disagree = textContent.disagree;
    const neutral = textContent.neutral;

    // Effect hook to update positions based on selected parties and topics
    useEffect(() => {
        // Controleer of zowel geselecteerde partijen als een geselecteerd onderwerp aanwezig zijn
        if (selectedParties.length > 0 && selectedTopic) {
            const newPositions = {};
            selectedParties.forEach((party) => {
                // Controleer eerst of het geselecteerde onderwerp en de partij bestaan in de huidige taaldata
                if (currentPositionsData[selectedTopic] && currentPositionsData[selectedTopic][party]) {
                    newPositions[party] = currentPositionsData[selectedTopic][party];
                } else {
                    newPositions[party] = "Geen positie beschikbaar";
                }
            });
            setPositions(newPositions);
        }
    }, [selectedParties, selectedTopic, language, currentPositionsData]);

    // Function to toggle expansion of party items
    const toggleItemExpansion = (party) => {
        setExpandedItems(prev => ({ ...prev, [party]: !prev[party] }));
    };

    // Component rendering
    return (
        <>
            <div className={styles.electionHelperContainer}>
                {/* Page header with random image and title */}
                <PageHeader imageSrc={randomHeaderImage} title={textContent.pages.electionHelper.name}  />
                {/* Section for selecting parties */}
                <h1 className={styles.pageTitle}>{textContent.chooseParties}</h1>
                <PartyList
                    parties={partiesData.partijen}
                    selectedParties={selectedParties}
                    togglePartySelection={togglePartySelection}
                />
                <div ref={topicListRef}>
                    {/* Section for selecting topics */}
                <h1 className={styles.topicTitle}>{textContent.chooseTopic}</h1>
                    <TopicList
                        topics={topics}
                        selectedTopic={selectedTopic}
                        handleTopicSelection={handleTopicSelection}
                    />
                </div>
                {/* Scroll component for easy navigation */}
                <ScrollComponent scrollRef={topicListRef} />
                {/* Display selected parties and their positions */}
                <div className={styles.selectedPartiesContainer}>
                    <h1 className={styles.selectedPartiesTitle}>{textContent.selectedParties}</h1>
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
                            noPositionAvailable={textContent.noPositionAvailable}
                            agree={agree}
                            disagree={disagree}
                            neutral={neutral}
                        />
                    ))}
                </div>
                {/* Container for action buttons */}
                <div className={styles.buttonsContainer}>
                    <StyledButton label="Reset" onClick={handleReset} />
                    <Link to='/score-page'>
                        <StyledButton label={textContent.results} />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ElectionHelper;
