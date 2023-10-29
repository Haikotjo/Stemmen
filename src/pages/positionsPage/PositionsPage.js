import React, { useEffect, useState } from 'react';
import positionsData from '../../data/positions.json';
import partiesData from '../../data/parties.json';
import TopicList from "../../Components/topicList/TopicList"; // Zorg ervoor dat dit pad correct is

function PositionsPage() {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [positions, setPositions] = useState({});
    const topics = Object.keys(positionsData); // Haal de onderwerpen uit positionsData

    useEffect(() => {
        if (selectedTopic) {
            const newPositions = {};
            partiesData.partijen.forEach((party) => {
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
            <TopicList
                topics={topics}
                selectedTopic={selectedTopic}
                handleTopicSelection={handleTopicSelection}
            />

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
