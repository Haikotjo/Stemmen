// Importing required modules and components
import React, { useState } from 'react';
import positionsData from '../../data/positions.json';
import TopicList from "../../Components/topicList/TopicList";
import usePositions from "../../hooks/usePositions";
import PartyPosition from "../../Components/partyPosition/PartyPosition";
import styles from "../partiesPage/PartiesPage.module.scss";

// PositionsPage component definition
// This component displays the positions of various parties on a selected topic
function PositionsPage() {
    // State to keep track of the selected topic
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Custom hook to get the positions of parties on the selected topic
    const positions = usePositions(selectedTopic);

    // Extracting the list of topics from positionsData
    const topics = Object.keys(positionsData);

    // Handler function to set the selected topic
    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic);
    };

    // Render the component
    return (
        <div className="PositionsPage">
            <img src="/images/backgrounds/kiezen.png" alt="Achtergrondafbeelding" className={styles.backgroundImage} />
            {/* TopicList component to display the list of topics */}
            <TopicList
                topics={topics}
                selectedTopic={selectedTopic}
                handleTopicSelection={handleTopicSelection}
            />

            {/*
                Loop through the positions object and render a PartyPosition component for each party.
                Pass the party name, position, and selected topic as props.
            */}
            {Object.keys(positions).map((party) => (
                <PartyPosition key={party} party={party} position={positions[party]} topic={selectedTopic} />
            ))}
        </div>
    );
}

// Export the component for use in other files
export default PositionsPage;
