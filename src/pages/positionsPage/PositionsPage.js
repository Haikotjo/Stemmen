// Importing required modules and components
import React, {useState, useRef} from 'react';
import positionsData from '../../data/positions.json';
import TopicList from "../../Components/topicList/TopicList";
import usePositions from "../../hooks/usePositions";
import PartyPosition from "../../Components/partyPosition/PartyPosition";
import styles from "./PositionsPage.module.scss";
import {getRandomImage} from "../../utils/utils";
import {useLanguage} from "../../context/LanguageContext";

// PositionsPage component definition
// This component displays the positions of various parties on a selected topic
function PositionsPage() {
    const randomImage =  getRandomImage();
    // State to keep track of the selected topic
    const [selectedTopic, setSelectedTopic] = useState(null);

    const positionsRef = useRef(null);

    const { language } = useLanguage();

    // Custom hook to get the positions of parties on the selected topic
    const currentPositionsData = positionsData[language] || positionsData.nl;

    // Extracting the list of topics from positionsData
    const topics = Object.keys(currentPositionsData);


    // Handler function to set the selected topic
    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic);
        // Check if positionsRef.current is not null and then scroll into view
        if(positionsRef.current) {
            positionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const topicPositions = selectedTopic && currentPositionsData[selectedTopic] ? currentPositionsData[selectedTopic] : {};

    // Render the component
    return (
        <>
            <div className={styles.headerWrapper}>
                <img src={randomImage} alt="Header" className={styles.backgroundImage} />
                <h1 className={styles.headerText}>STANDPUNTEN</h1>
            </div>
            <div className={styles.positionPageContainer}>
                {/* TopicList component to display the list of topics */}
                <div className={styles.topicsContainer}>
                <TopicList
                    topics={topics}
                    selectedTopic={selectedTopic}
                    handleTopicSelection={handleTopicSelection}
                />
                </div>
                {/*
                Loop through the positions object and render a PartyPosition component for each party.
                Pass the party name, position, and selected topic as props.
            */}
                <div ref={positionsRef}>
                    {Object.keys(topicPositions).map((party) => (
                        <PartyPosition
                            key={party}
                            party={party}
                            position={topicPositions[party]}
                            topic={selectedTopic}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

// Export the component for use in other files
export default PositionsPage;
