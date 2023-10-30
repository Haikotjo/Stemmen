// Importing required modules and components
import React from 'react';
import StyledButton from '../button/StyledButton';
import styles from './TopicList.module.scss';

// TopicList component definition
// It takes three props: topics, selectedTopic, and handleTopicSelection
const TopicList = ({ topics, selectedTopic, handleTopicSelection }) => {
    // Render the component
    return (
        <div>
            {/*
                Loop through the topics array and render a StyledButton for each topic.
                The button label will show "(selected)" next to the topic name if it's the selected topic.
            */}
            {topics.map((topic) => (
                <StyledButton
                    key={topic}  // Unique key for each button, required by React
                    label={topic === selectedTopic ? `${topic} (selected)` : topic}  // Button label
                    onClick={() => handleTopicSelection(topic)}  // onClick handler
                    className={topic === selectedTopic ? styles.selected : ''}  // Conditional styling
                />
            ))}
        </div>
    );
};

// Export the component for use in other files
export default TopicList;
