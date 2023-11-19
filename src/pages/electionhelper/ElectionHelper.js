import React, {useState, useEffect, useContext, useRef} from 'react';
import partiesData from '../../data/parties.json';
import positionsData from '../../data/positions.json';
import PartyList from "../../Components/partyList/PartyList";
import TopicList from "../../Components/topicList/TopicList";
import StyledButton from "../../Components/button/StyledButton";
import styles from "./ElectionHelper.module.scss";
import {getPartyImage, getRandomImagePage} from "../../utils/utils";
import { ScoreContext } from "../../context/ScoreContext";
import useHandleAnswer from "../../hooks/useHandleAnswer";
import useUndoAnswer from "../../hooks/useUndoAnswer";
import useToggleParty from "../../hooks/useToggleParty";
import useHandleTopicSelection from "../../hooks/useHandleTopicSelection";
import useReset from "../../hooks/useReset";
import SelectedPartyItem from "../../Components/selectedPartyItem/SelectedPartyItem";
import {useLanguage} from "../../context/LanguageContext";
import {Link} from "react-router-dom";
import ScrollComponent from "../../Components/scrollComponent/ScrollComponent";
import PageHeader from "../../Components/pageHeader/PageHeader";
import textData from "../../data/textData.json";



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
    const textContent = textData[language];

    const topicListRef = useRef(null);


    const translations = {
        nl: {
            electionHelper: "KIES HULP",
            chooseParties: "Kies de partijen die je wilt vergelijken",
            chooseTopic: "Kies een onderwerp",
            selectedParties: "Geselecteerde Partijen:",
            noPositionAvailable: "Kies een onderwerp",
            agree: "Eens",
            disagree: "Oneens",
            neutral: "Neutraal",
            results: "Uitslag"
        },
        en: {
            electionHelper:"ELECTION HELPER",
            chooseParties: "Choose the parties you want to compare",
            chooseTopic: "Choose a topic",
            selectedParties: "Selected Parties:",
            noPositionAvailable: "Choose a subject",
            agree: "Agree",
            disagree: "Disagree",
            neutral: "Neutral",
            results: "results"
        },
        kids: {
            electionHelper: "KIES HULP",
            chooseParties: "Welke partijen vind je leuk!",
            chooseTopic: "Kies iets waar jij meer over wil weten",
            selectedParties: "Deze partijen heb je gekozen:",
            noPositionAvailable: "Kies een onderwerp",
            agree: "Ja goed plan!",
            disagree: "Nee joh!",
            neutral: "Ik weet niet",
            results: "Check de uitslag!"
        }
    };

    const t = translations[language];
    const agree = t.agree;
    const disagree = t.disagree;
    const neutral = t.neutral;
    const results = t.results;

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
            <div className={styles.electionHelperContainer}>
                <PageHeader imageSrc={randomHeaderImage} title={textContent.pages.electionHelper.name}  />
                <h1 className={styles.pageTitle}>{t.chooseParties}</h1>
                <PartyList
                    parties={partiesData.partijen}
                    selectedParties={selectedParties}
                    togglePartySelection={togglePartySelection}
                />
                <div ref={topicListRef}>
                <h1 className={styles.topicTitle}>{t.chooseTopic}</h1>

                    <TopicList
                        topics={topics}
                        selectedTopic={selectedTopic}
                        handleTopicSelection={handleTopicSelection}
                    />
                </div>

                <ScrollComponent scrollRef={topicListRef} />

                <div className={styles.selectedPartiesContainer}>
                    <h1 className={styles.selectedPartiesTitle}>{t.selectedParties}</h1>
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
{/*<h1 className={styles.changeTopic}>Change topic</h1>*/}
{/*            <TopicList*/}
{/*                topics={topics}*/}
{/*                selectedTopic={selectedTopic}*/}
{/*                handleTopicSelection={handleTopicSelection}*/}
{/*            />*/}

            <div className={styles.buttonsContainer}>
                <StyledButton label="Reset" onClick={handleReset} />
                <Link to='/score-page'>
                <StyledButton label={results} />
                </Link>
            </div>
        </>
    );
}

export default ElectionHelper;
