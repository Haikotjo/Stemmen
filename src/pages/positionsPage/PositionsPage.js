import React, { useEffect, useState } from 'react';
import positionsData from '../../data/positions.json';
import partiesData from '../../data/parties.json';

function PositionsPage() {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [positions, setPositions] = useState({});

    useEffect(() => {
        if (selectedTopic) {
            const newPositions = {};
            partiesData.partijen.forEach((party) => {  // Let op de .partijen hier
                const position = positionsData[selectedTopic][party];
                if (position) {
                    newPositions[party] = position;
                }
            });
            setPositions(newPositions);
        }
    }, [selectedTopic]);

    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic);
    };

    return (
        <div className="PositionsPage">
            <button onClick={() => handleTopicSelection('Onderwerp1')}>Onderwerp1</button>
            <button onClick={() => handleTopicSelection('Onderwerp2')}>Onderwerp2</button>

            {Object.keys(positions).map((party) => (
                <div key={party}>
                    <h1>{party}</h1>
                    <h3>{selectedTopic}:</h3>
                    <p>{positions[party]}</p>
                </div>
            ))}
        </div>
    );
}

export default PositionsPage;
