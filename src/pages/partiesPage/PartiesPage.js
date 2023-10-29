import React, { useEffect, useState } from 'react';
import { getPositions } from '../../utils/utils';
import positionsData from '../../data/positions.json';
import partiesData from '../../data/parties.json'; // Importeer de partijen data
import PartyList from "../../Components/partyList/PartyList";
import TopicList from "../../Components/topicList/TopicList";

function PartiesPage() {
    const [selectedParty, setSelectedParty] = useState(null);
    const [positions, setPositions] = useState({});
    const [currentTopics, setCurrentTopics] = useState([]);

    useEffect(() => {
        if (selectedParty) {
            const newPositions = {};
            const newTopics = [];
            Object.keys(positionsData).forEach((topic) => {
                const position = getPositions(topic, selectedParty);
                newPositions[topic] = position;
                newTopics.push(topic);
            });
            setPositions(newPositions);
            setCurrentTopics(newTopics);
        }
    }, [selectedParty]);

    const handlePartySelection = (party) => {
        setSelectedParty(party);
    };

    return (
        <div className="PartiesPage">
            <PartyList
                parties={partiesData.partijen} // Gebruik de partijen uit parties.json
                selectedParties={[selectedParty]} // Je huidige geselecteerde partij
                togglePartySelection={handlePartySelection} // Je functie om de selectie te veranderen
            />

            {selectedParty && <h1>Selected Party: {selectedParty}</h1>}

            {selectedParty && (
                <TopicList
                    topics={currentTopics}
                    selectedTopic={null} // Je kunt dit vervangen door je huidige geselecteerde topic
                    handleTopicSelection={() => {}} // Je functie om de topic selectie te veranderen
                />
            )}

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
