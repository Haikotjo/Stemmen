import React, { useState } from 'react';
import positionsData from '../../data/positions.json';
import TopicList from "../../Components/topicList/TopicList";
import usePositions from "../../hooks/usePositions"; // Zorg ervoor dat dit pad correct is

function PositionsPage() {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const positions = usePositions(selectedTopic);
    const topics = Object.keys(positionsData); // Haal de onderwerpen uit positionsData


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
