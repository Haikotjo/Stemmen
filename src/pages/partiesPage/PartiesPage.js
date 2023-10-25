import React, { useEffect, useState } from 'react';
import { getPositions } from '../../utils/utils';
import positionsData from '../../data/positions.json'; // Zorg ervoor dat dit pad correct is

function PartiesPage() {
    const [selectedParty, setSelectedParty] = useState(null);
    const [positions, setPositions] = useState({});

    useEffect(() => {
        if (selectedParty) {
            const newPositions = {};
            Object.keys(positionsData).forEach((topic) => {
                const position = getPositions(topic, selectedParty);
                newPositions[topic] = position;
            });
            setPositions(newPositions);
        }
    }, [selectedParty]);

    const handlePartySelection = (party) => {
        setSelectedParty(party);
    };

    return (
        <div className="PartiesPage">
            <button onClick={() => handlePartySelection('VVD')}>VVD</button>
            <button onClick={() => handlePartySelection('NSC')}>NSC</button>
            <button onClick={() => handlePartySelection('Groenlinks PVDA')}>GroenlinksPVDA</button>

            {selectedParty && <h1>Selected Party: {selectedParty}</h1>}

            {Object.keys(positions).map((topic) => (
                <div key={topic}>
                    <h3>{topic}:</h3>
                    <p>{positions[topic]}</p>
                </div>
            ))}
        </div>
    );
}

export default PartiesPage;
