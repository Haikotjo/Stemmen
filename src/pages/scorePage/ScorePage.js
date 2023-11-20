import React, { useContext } from 'react';
import { ScoreContext } from '../../context/ScoreContext';
import styles from './ScorePage.module.scss';
import { useLanguage } from "../../context/LanguageContext";
import { getPartyImage } from '../../utils/utils';
import { Link } from 'react-router-dom';
import StyledButton from "../../Components/button/StyledButton";
import useReset from "../../hooks/useReset";

const ScorePage = () => {
    // Accessing party scores from the context
    const { partyScores } = useContext(ScoreContext);
    // Using custom hook to access the current language setting
    const { language } = useLanguage();
    // Custom hook for handling reset functionality
    const handleReset = useReset();
    // Retrieving saved data from local storage
    const savedData = JSON.parse(localStorage.getItem('answeredQuestions'));
    // Retrieving saved language preference from local storage
    const savedLanguage = localStorage.getItem('language');
    // Array to hold parties with which the user agrees or disagrees
    const partiesUserAgreesOrDisagreesWith = [];

    // Looping through saved data to extract user's answers
    for (const [questionPartyKey, answer] of Object.entries(savedData)) {
        const [topic, party] = questionPartyKey.split('_');
        // Filtering answers based on language and pushing them into the array
        if (language === 'nl' && (answer === 'Eens' || answer === 'Oneens' || answer === 'Neutraal')) {
            partiesUserAgreesOrDisagreesWith.push({ topic, party, answer });
        } else if (language === 'kids' && (answer === 'Ja goed plan!' || answer === 'Nee joh!' || answer === 'Ik weet niet')) {
            partiesUserAgreesOrDisagreesWith.push({ topic, party, answer });
        } else if (language === 'en' && (answer === 'Agree' || answer === 'Disagree' || answer === 'Neutral')) {
            partiesUserAgreesOrDisagreesWith.push({ topic, party, answer });
        }
    }

    const translations = {
        nl: {
            match: "Met deze partijen ben je het, het meest eens.",
            noScores: "Doe de kies-hulp om te kijken welke partij het best bij je past.",
            electionHelp: "Kies Hulp"
        },
        en: {
            match: "These are the parties you most agree with",
            noScores: "Do the election helper to find out which party suits you best.",
            electionHelp: "Election Helper"
        },
        kids: {
            match: "Deze partijen vind jij het leukst.",
            noScores: "Doe de kies-hulp om te ontdekken welke partij cool voor jou is!",
            electionHelp: "Kies Hulpje"
        },
    };

    // Retrieving the correct translation based on saved language
    const t = translations[savedLanguage];

    // Sorting party scores in descending order
    const sortedPartyScores = Object.entries(partyScores).sort(([, scoreA], [, scoreB]) => scoreB - scoreA);
    // Mapping sorted scores to include image source and empty answers array
    const partiesWithImages = sortedPartyScores.map(([party, score]) => ({
        party, score, imageSrc: getPartyImage(party), answers: []
    }));

    // Adding user's answers to corresponding parties
    for (const { topic, party, answer } of partiesUserAgreesOrDisagreesWith) {
        const partyIndex = partiesWithImages.findIndex(partyObj => partyObj.party === party);
        if (partyIndex !== -1) {
            partiesWithImages[partyIndex].answers.push({ topic, answer });
        }
    }

    // Check if there are any scores to display
    const hasScores = Object.keys(partyScores).length > 0;

    return (
        <>
            <div className={styles.scorePage}>
                <div className={styles.imgContainer}>
                    <img src= '/images/party/party-monster-5.png' alt="Party Monster 5" />
                    <img src= '/images/party/party-monster-7.png' alt="Party Monster 7" />
                    <img src= '/images/party/party-monster-6.png' alt="Party Monster 6" />
                </div>
                {hasScores ? (
                    <>
                        <h1 className={styles.scorePage__subtitle}>{t.match}</h1>
                        <ul className={styles.scorePage__partyList}>
                            {sortedPartyScores.map(([party, score]) => (
                                <li key={party} className={styles.scorePage__partyItem}>
                                    <img src={getPartyImage(party)} alt={`${party} logo`} className={styles.scorePage__partyImage} />
                                    <h2 className={styles.scorePage__partyInfo}>{party}: {score}</h2>
                                    {/* Voeg hier de details over de overeenkomsten per partij toe */}
                                    <ul className={styles.scorePage__partyDetails}>
                                        {partiesUserAgreesOrDisagreesWith
                                            .filter(item => item.party === party)
                                            .map(({ topic, answer }) => (
                                                <li
                                                    key={`${party}_${topic}`}
                                                    className={`${styles.scorePageTopicAnswer} ${
                                                        answer === 'Eens' || answer === 'Ja goed plan!' || answer === 'Agree'
                                                            ? styles.agreeClass
                                                            : answer === 'Oneens' || answer === 'Nee joh!' || answer === 'Disagree'
                                                                ? styles.disagreeClass
                                                                : styles.neutralClass
                                                    }`}
                                                >
                                                    {`${topic}: ${answer}`}
                                                </li>
                                            ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>{t.noScores} <Link to="/kies-hulp" className={styles.linkToPage}>&gt;&gt;&gt;</Link></p>
                )}
                <div className={styles.buttonsContainer}>
                    <Link to='/kies-hulp'>
                        <StyledButton label={t.electionHelp} />
                    </Link>
                    {hasScores && (
                        <Link to='/kies-hulp'>
                            <StyledButton label="Reset" onClick={handleReset} />
                        </Link>
                    )}

                </div>
            </div>
        </>
    );
};


export default ScorePage;
