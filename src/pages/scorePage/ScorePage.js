
import React, { useContext } from 'react';
import { ScoreContext } from '../../context/ScoreContext';
import styles from './ScorePage.module.scss';
import { useLanguage } from "../../context/LanguageContext";
import { getPartyImage } from '../../utils/utils';
import { Link } from 'react-router-dom'; // Importeer Link van React Router

const ScorePage = () => {
    const { partyScores } = useContext(ScoreContext);
    const { language } = useLanguage();
    const savedAnswers = JSON.parse(localStorage.getItem('answeredQuestions'));
    const partiesUserAgreesOrDisagreesWith = [];

    for (const [questionPartyKey, answer] of Object.entries(savedAnswers)) {
        const [topic, party] = questionPartyKey.split('_');
        if (answer === 'Eens' || answer === 'Oneens') {
            partiesUserAgreesOrDisagreesWith.push({ topic, party, answer });
        }
    }

    const translations = {
        nl: {
            match: "Met deze partijen ben je het, het meest eens.",
            noScores: "Doe de kies-hulp om te kijken welke partij het best bij je past."
        },
        en: {
            match: "These are the parties you most agree with",
            noScores: "Do the election helper to find out which party suits you best."
        },
        kids: {
            kiesHulp: "Deze partijen vind jij het leukst.",
            noScores: "Doe de kies-hulp om te ontdekken welke partij cool voor jou is!"
        },
    };

    const t = translations[language];

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
                                            <li key={`${party}_${topic}`} className={styles.scorePage__partyDetail}>
                                                {`${topic}: ${answer}`}
                                            </li>
                                        ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>
                    {t.match}: <Link to="/kies-hulp" className={styles.linkToPage}>&gt;&gt;&gt;</Link> {/* Gebruik de Link-component */}
                </p>
            )}
        </div>
    );
};


export default ScorePage;
