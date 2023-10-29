import React, { useState } from 'react';
import positionsData from '../../data/positions.json';
import TopicList from "../../Components/topicList/TopicList";
import usePositions from "../../hooks/usePositions";
import PartyPosition from "../../Components/partyPosition/PartyPosition";

//weergeven van de naam van de partij en hun standpunt voor een geselecteerd onderwerp.
function PositionsPage() {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const positions = usePositions(selectedTopic);
    const topics = Object.keys(positionsData);

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
                <PartyPosition key={party} party={party} position={positions[party]} topic={selectedTopic} />
            ))}
        </div>
    );
}

export default PositionsPage;
