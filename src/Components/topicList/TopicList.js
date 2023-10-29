
import React from 'react';
import StyledButton from '../button/StyledButton';
import styles from './TopicList.module.scss';

const TopicList = ({ topics, selectedTopic, handleTopicSelection }) => {
    return (
        <div>
            {topics.map((topic) => (
                <StyledButton
                    key={topic}
                    label={topic === selectedTopic ? `${topic} (selected)` : topic}
                    onClick={() => handleTopicSelection(topic)}
                    className={topic === selectedTopic ? styles.selected : ''}
                />
            ))}
        </div>
    );
};

export default TopicList;
