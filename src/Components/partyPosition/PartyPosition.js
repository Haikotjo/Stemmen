// Importing required modules
import React from 'react';

// PartyPosition component definition
// This component displays the position of a single party on a specific topic
const PartyPosition = ({ party, position, topic }) => {
    // Render the component
    return (
        <div>
            {/* Display the name of the party */}
            <h1>{party}</h1>

            {/* Display the topic and the party's position on that topic */}
            <h3>{topic}:</h3>
            <p>{position}</p>
        </div>
    );
};

// Export the component for use in other files
export default PartyPosition;
