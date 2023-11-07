// Importing required modules
import React from 'react';
import styles from './PartyPosition.module.scss'; // Ensure you have the correct path to your SCSS file

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
                    {/* The topic name is bolded for emphasis */}
                    <strong>{topic}:</strong>
                    {/* The party's position on the topic is displayed next to the topic name */}
                    {position}
                </li>
            </ul>
        </div>
    );
};

// Export the component for use in other files
export default PartyPosition;
