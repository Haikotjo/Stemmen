import React from 'react';

const PartyPosition = ({ party, position, topic }) => {
    return (
        <div>
            <h1>{party}</h1>
            <h3>{topic}:</h3>
            <p>{position}</p>
        </div>
    );
};

export default PartyPosition;
