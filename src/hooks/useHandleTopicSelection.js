// useHandleTopicSelection.js
import { useState } from 'react';

const useHandleTopicSelection = () => {
    const [selectedTopic, setSelectedTopic] = useState(null);

    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic);
    };

    // Make sure to return setSelectedTopic here
    return {
        selectedTopic,
        handleTopicSelection,
        setSelectedTopic // Voeg dit toe
    };
};

export default useHandleTopicSelection;
