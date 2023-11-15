
import React, { useContext } from 'react';
import { ScoreContext } from '../../context/ScoreContext';
import styles from './ScorePage.module.scss';
import { useLanguage } from "../../context/LanguageContext";
import { getPartyImage } from '../../utils/utils';
import { Link } from 'react-router-dom';
import StyledButton from "../../Components/button/StyledButton";
import useReset from "../../hooks/useReset";
import ResultCard from "../../Components/resultCard/ResultCard"; // Importeer Link van React Router

const ScorePage = () => {
    const { partyScores } = useContext(ScoreContext);
    const { language } = useLanguage();
    const handleReset = useReset();
    const savedData = JSON.parse(localStorage.getItem('answeredQuestions'));
    const savedLanguage = localStorage.getItem('language');
    const partiesUserAgreesOrDisagreesWith = [];

    console.log('Saved Data Structure:', savedData);


    for (const [questionPartyKey, answer] of Object.entries(savedData)) {
        const [topic, party] = questionPartyKey.split('_');
        if (language === 'nl' && (answer === 'Eens' || answer === 'Oneens' || answer === 'Neutraal')) {
            partiesUserAgreesOrDisagreesWith.push({ topic, party, answer });
        } else if (language === 'kids' && (answer === 'Ja goed plan!' || answer === 'Nee joh!' || answer === 'Ik weet niet')) {
            partiesUserAgreesOrDisagreesWith.push({ topic, party, answer });
        } else if (language === 'en' && (answer === 'Agree' || answer === 'Disagree' || answer === 'Neutral')) {
            partiesUserAgreesOrDisagreesWith.push({ topic, party, answer });
        }
        console.log('Parties User Agrees Or Disagrees With:', partiesUserAgreesOrDisagreesWith);
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

    const t = translations[savedLanguage];

    const sortedPartyScores = Object.entries(partyScores).sort(([, scoreA], [, scoreB]) => scoreB - scoreA);
    const partiesWithImages = sortedPartyScores.map(([party, score]) => ({
        party, score, imageSrc: getPartyImage(party), answers: []
    }));

    for (const { topic, party, answer } of partiesUserAgreesOrDisagreesWith) {
        const partyIndex = partiesWithImages.findIndex(partyObj => partyObj.party === party);
        if (partyIndex !== -1) {
            partiesWithImages[partyIndex].answers.push({ topic, answer });
        }
    }

    const hasScores = Object.keys(partyScores).length > 0;

    return (
        <>
            <div className={styles.scorePage}>
                <div className={styles.imgContainer}>
                    <img src= '/images/party/party-monster-5.png' alt="Party Monster 5" />
                    <img src= '/images/party/party-monster-7.png' alt="Party Monster 7" />
                    <img src= '/images/party/party-monster-6.png' alt="Party Monster 6" />
                </div>
                <h1 className={styles.scorePage__title}>scorepage</h1>
                {hasScores ? (
                    <>
                        <h2 className={styles.scorePage__subtitle}>{t.match}:</h2>
                        <ul className={styles.scorePage__partyList}>
                            {Object.entries(partyScores).map(([party, score]) => (
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
            </div>
            {/*<ResultCard*/}
            {/*    score={5}*/}
            {/*    reaction={5}*/}
            {/*    memory={5}*/}
            {/*    verbal={5}*/}
            {/*    visual={5}*/}
            {/*/>*/}
            <div className={styles.buttonsContainer}>
                {hasScores && (
                    <Link to='/kies-hulp'>
                        <StyledButton label="Reset" onClick={handleReset} />
                    </Link>
                )}
                <Link to='/kies-hulp'>
                    <StyledButton label={t.electionHelp} />
                </Link>
            </div>
        </>
    );
};


export default ScorePage;
