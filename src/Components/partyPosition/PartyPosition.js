import React, {useEffect, useState} from 'react';
import styles from './PartyPosition.module.scss'; // Ensure you have the correct path to your SCSS file

// PartyPosition component definition
// This component displays the position of a single party on a specific topic
const PartyPosition = ({ party, position, topic }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [firstSentence, setFirstSentence] = useState('');
    const [restOfTheText, setRestOfTheText] = useState('');

    useEffect(() => {
        const sentenceEnd = position.includes('.') ? position.indexOf('.') + 1 : position.length;
        setFirstSentence(position.substring(0, sentenceEnd));
        setRestOfTheText(position.substring(sentenceEnd));
    }, [position]);

    return (
        <div className={styles.partyPositionContainer}>
            {/* Display the name of the party */}
            <h1 className={styles.partyName}>{party}</h1>

            {/* Display the topic and the party's position on that topic as a list */}
            <ul className={styles.positionList}>
                <li>
                    {/* The topic name is bolded for emphasis */}
                    <strong className={styles.topicSmall} >{topic}:</strong>
                    {/* The first sentence of the party's position is displayed in bold */}
                    <span className={styles.boldText}>{firstSentence}
                    {/* Ellipsis (...) for expanding the rest of the text */}
                    {!isExpanded && (
                        <span className={styles.moreText} onClick={() => setIsExpanded(true)}> >>></span>
                    )}
                        </span>
                    {/* Display the rest of the text when expanded */}
                    {isExpanded && <span>{restOfTheText} <span className={styles.moreText} onClick={() => setIsExpanded(false)}> {"<<<"} </span></span>}
                </li>
            </ul>
        </div>
    );
};

// Export the component for use in other files
export default PartyPosition;
