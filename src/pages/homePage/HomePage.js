import styles from './HomePage.module.scss';
import React, { useEffect, useState } from 'react';
import { getPositions } from '../../utils/utils';

function HomePage() {
    const [selectedParties, setSelectedParties] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [positions, setPositions] = useState({});

    useEffect(() => {
        if (selectedParties.length > 0 && selectedTopic) {
            const newPositions = {};
            selectedParties.forEach((party) => {
                const position = getPositions(selectedTopic, party);
                newPositions[party] = position;
            });
            setPositions(newPositions);
        }
    }, [selectedParties, selectedTopic]);

    const togglePartySelection = (party) => {
        setSelectedParties((prevSelectedParties) =>
            prevSelectedParties.includes(party)
                ? prevSelectedParties.filter((p) => p !== party)
                : [...prevSelectedParties, party]
        );
    };

    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic);
    };

    return (
        <div className="App">
            <button onClick={() => togglePartySelection('VVD')}>VVD</button>
            <button onClick={() => togglePartySelection('NSC')}>NSC</button>
            <button onClick={() => togglePartySelection('Groenlinks PVDA')}>GroenlinksPVDA</button>
            <button onClick={() => handleTopicSelection('Onderwerp1')}>Select Onderwerp1</button>
            <button onClick={() => handleTopicSelection('Onderwerp2')}>Select Onderwerp2</button>

            {selectedParties.length > 0 && <h1>Selected Parties: {selectedParties.join(', ')}</h1>}
            {Object.keys(positions).map((party) => (
                <div key={party}>
                    <h1>{party}</h1>
                    <h3> {selectedTopic}:</h3>
                    <p>
                        {positions[party]}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default HomePage;
