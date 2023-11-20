// Importing required modules and components
import React from 'react';
import StyledButton from '../button/StyledButton';
import styles from './TopicList.module.scss';

// TopicList component definition.
// This component renders a list of topics as buttons.
// It accepts three props:
// - 'topics': an array of topic strings.
// - 'selectedTopic': the currently selected topic.
// - 'handleTopicSelection': a function to handle when a topic is selected.
const TopicList = ({ topics, selectedTopic, handleTopicSelection }) => {
    // Render the component
    return (
        <div className={styles.topicListContainer}>
            {/*
                Iterate over the 'topics' array, rendering a StyledButton for each topic.
                Each button is given a unique key for React's rendering optimization.
                The label of the button is the topic name, and if it's the currently selected topic,
                it is visually distinguished (e.g., different styling to indicate selection).
                When a button is clicked, 'handleTopicSelection' is called with the respective topic.
            */}
            {topics.map((topic) => (
                <StyledButton
                    key={topic}
                    label={topic === selectedTopic ? `${topic}` : topic}
                    onClick={() => handleTopicSelection(topic)}
                    className={`${styles.styledButton} ${topic === selectedTopic ? styles.selected : ''}`} // Add extra classes if needed, for example, to style the selected topic differently
                />
            ))}
        </div>
    );
};

// Export the component for use in other files
export default TopicList;
