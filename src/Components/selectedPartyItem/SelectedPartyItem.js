import React, {useEffect, useState} from 'react';
import StyledButton from "../button/StyledButton";
import styles from './SelectedPartyItem.module.scss';

const SelectedPartyItem = ({
                               party,
                               isExpanded,
                               toggleExpansion,
                               partyScores,
                               getPartyImage,
                               positions,
                               handleAnswer,
                               undoAnswer,
                               answeredQuestions,
                               selectedTopic,
                               noPositionAvailable
                           }) => {

    const [positionText, setPositionText] = useState('');

    useEffect(() => {
        // Update de positietekst wanneer de positions prop verandert
        if (positions && positions[party]) {
            setPositionText(positions[party]);
        } else {
            setPositionText(noPositionAvailable);
        }
    }, [positions, party, noPositionAvailable]);

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
                    {positionText && (
                        <div className={styles.positionText}>
                            <strong className={styles.firstSentence}>
                                {positionText.split('.')[0] + '.'}
                            </strong>
                            {!isExpanded && selectedTopic && (
                                <span className={styles.moreText} onClick={toggleExpansion}> >>></span>
                            )}
                            <div className={styles.restOfTextContainer}>
                                {isExpanded && (
                                    <span className={styles.restOfText}>
                                {positionText.substring(positionText.split('.')[0].length + 1)}
                                        <span className={styles.moreText} onClick={toggleExpansion}> {"<<<"} </span>
                            </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {selectedTopic && (
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
