import React, { useEffect, useState } from 'react';
import styles from './SelectedPartyItem.module.scss';
import { BsFillEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill } from 'react-icons/bs';
import StyledButton from "../button/StyledButton";

// SelectedPartyItem component definition
// This component displays the selected party information including its position on a topic
// and provides interactive emoji buttons for user's response.
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
                               noPositionAvailable,
                               agree,
                               disagree,
                               neutral
                           }) => {
    const [positionText, setPositionText] = useState('');

    // Update the position text based on the selected party and topic
    useEffect(() => {
        setPositionText(positions[party] || noPositionAvailable);
    }, [positions, party, noPositionAvailable]);

    // Function to handle image loading error
    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = `${process.env.PUBLIC_URL}/images/parties/default.png`;
    };

    // Function to render emoji buttons based on user's answer
    const renderEmojiButtons = () => {
        return answeredQuestions[`${selectedTopic}_${party}`]
            ? <StyledButton label="Ongedaan maken" onClick={() => undoAnswer(party, selectedTopic)} />
            : (
                <>
                    <BsFillEmojiSmileFill className={`${styles.emoji} ${styles.happyEmoji}`} onClick={() => handleAnswer(party, selectedTopic, agree)} />
                    <BsEmojiNeutralFill className={`${styles.emoji} ${styles.neutralEmoji}`} onClick={() => handleAnswer(party, selectedTopic, neutral)} />
                    <BsEmojiFrownFill className={`${styles.emoji} ${styles.sadEmoji}`} onClick={() => handleAnswer(party, selectedTopic, disagree)} />
                </>
            );
    };

    return (
        <div className={styles.selectedPartyItemContainer}>
            <div className={styles.selectedPartyItem}>
                {/* Party logo */}
                <img src={getPartyImage(party)} alt={`${party} logo`} className={styles.partyLogo} onError={handleImageError} />

                {/* Party information including position on a topic */}
                <div className={styles.partyInfo}>
                    <h2 className={styles.partyName}>{party}</h2>
                    {positionText && (
                        <div className={styles.positionText}>
                            {/* Display the first sentence of the position */}
                            <strong className={styles.firstSentence}>{positionText.split('.')[0] + '.'}</strong>
                            {/* Toggle button for expanding or collapsing the rest of the position text */}
                            {!isExpanded && selectedTopic && <span className={styles.moreText} onClick={toggleExpansion}> >>></span>}
                            {isExpanded && <span className={styles.restOfText}>{positionText.substring(positionText.split('.')[0].length + 1)}</span>}
                            <span className={styles.moreText} onClick={toggleExpansion}> {isExpanded ? "<<<" : ""} </span>
                        </div>
                    )}
                </div>

                {/* Emoji buttons for user interaction */}
                {selectedTopic && (
                    <div className={styles.buttonContainer}>
                        <div className={styles.emojiContainer}>
                            {renderEmojiButtons()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectedPartyItem;
