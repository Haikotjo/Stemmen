// Importing required modules
import React from 'react';
import styles from './PartyPosition.module.scss'; // Zorg ervoor dat je de juiste pad naar je SCSS-bestand hebt

// PartyPosition component definition
// This component displays the position of a single party on a specific topic
const PartyPosition = ({ party, position, topic }) => {
    // Render the component
    return (
        <div className={styles.partyPositionContainer}>
            {/* Display the name of the party */}
            <h1>{party}</h1>

            {/* Display the topic and the party's position on that topic as a list */}
            <ul className={styles.positionList}>
                <li>
                    <strong>{topic}:</strong> {position}
                </li>
            </ul>
        </div>
    );
};

// Export the component for use in other files
export default PartyPosition;
