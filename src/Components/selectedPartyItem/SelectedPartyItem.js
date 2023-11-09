// SelectedPartyItem.js
import React from 'react';
import StyledButton from "../button/StyledButton";
import styles from './SelectedPartyItem.module.scss';

const SelectedPartyItem = ({
                               party,
                               partyScores,
                               getPartyImage,
                               positions,
                               handleAnswer,
                               undoAnswer,
                               answeredQuestions,
                               selectedTopic,
                           }) => {
    return (
        <div className={styles.selectedPartyItemContainer}>
            <div className={styles.selectedPartyItem}>
                <img
                    src={getPartyImage(party)}
                    alt={`${party} logo`}
                    className={styles.partyLogo}
                    onError={(e) => { e.target.onerror = null; e.target.src = `${process.env.PUBLIC_URL}/images/parties/default.png`; }}
                />
                <div className={styles.partyInfo}>
                    <h2>{party}</h2>
                    {positions && <p>{positions[party]}</p>} {/* Zorg dat positions gecontroleerd wordt voordat je toegang probeert te krijgen tot de waarde */}
                </div>
                {selectedTopic && ( // Check of selectedTopic bestaat voordat de knoppen worden weergegeven
                    <div className={styles.buttonContainer}>
                        {answeredQuestions[`${selectedTopic}_${party}`] ? (
                            <StyledButton
                                label="Ongedaan maken"
                                onClick={() => undoAnswer(party, selectedTopic)}
                            />
                        ) : (
                            <>
                                <StyledButton label="Eens" onClick={() => handleAnswer(party, selectedTopic, 'Eens')} />
                                <StyledButton label="Oneens" onClick={() => handleAnswer(party, selectedTopic, 'Oneens')} />
                                <StyledButton label="Neutraal" onClick={() => handleAnswer(party, selectedTopic, 'Neutraal')} />
                            </>
                        )}
                        {partyScores[party] !== undefined && <h2>Score: {partyScores[party]}</h2>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectedPartyItem;
