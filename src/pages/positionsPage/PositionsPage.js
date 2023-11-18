// Importing required modules and components
import React, {useState, useRef} from 'react';
import positionsData from '../../data/positions.json';
import TopicList from "../../Components/topicList/TopicList";
import PartyPosition from "../../Components/partyPosition/PartyPosition";
import styles from "./PositionsPage.module.scss";
import {getRandomImage} from "../../utils/utils";
import {useLanguage} from "../../context/LanguageContext";
import ScrollComponent from "../../Components/scrollComponent/ScrollComponent";
import PageHeader from "../../Components/pageHeader/PageHeader";

 // PositionsPage component definition
// This component displays the positions of various parties on a selected topic.
// It utilizes a language context for localization and dynamically loads party positions based on the selected topic.
function PositionsPage() {
    const randomImage =  getRandomImage();
    // State to keep track of the selected topic
    const [selectedTopic, setSelectedTopic] = useState(null);

    // useRef hook to create a ref for scrolling functionality
    const positionsRef = useRef(null);

    // Accessing language context for localized data
    const { language } = useLanguage();

    // Extracting positions data based on the current language context
    const currentPositionsData = positionsData[language] || positionsData.nl;

    // Extracting the list of topics from positionsData
    const topics = Object.keys(currentPositionsData);

    // Handler function to set the selected topic and trigger UI updates
    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic);
    };

    // Extracting the positions of each party for the selected topic
    const topicPositions = selectedTopic && currentPositionsData[selectedTopic] ? currentPositionsData[selectedTopic] : {};

    // Render the component
    return (
        <>
            <div ref={positionsRef} className={styles.positionPageContainer}>
                <PageHeader imageSrc={randomImage} title="STANDPUNTEN" />
                {/* TopicList component to display the list of topics */}
                <div className={styles.topicsContainer}>
                    {/*
                    TopicList component is used here to display the list of topics.
                    It receives the topics array, the currently selected topic, and
                    a function to handle topic selection. When a topic is selected,
                    handleTopicSelection updates the state to reflect the new selection.
                */}
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
                <div >
                    {Object.keys(topicPositions).map((party) => (
                        <PartyPosition
                            key={party}
                            party={party}
                            position={topicPositions[party]}
                            topic={selectedTopic}
                        />
                    ))}
                </div>
                {/* ScrollComponent provides a way to scroll back to the top of the page */}
                <ScrollComponent scrollRef={positionsRef} />
            </div>
        </>
    );
}

// Export the component for use in other files
export default PositionsPage;
