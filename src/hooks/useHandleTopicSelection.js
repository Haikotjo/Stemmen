import { useState } from 'react';

// Define a custom hook called useHandleTopicSelection
const useHandleTopicSelection = () => {
    // useState hook to manage the state of the selected topic
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Define a function that updates the selected topic state
    const handleTopicSelection = (topic) => {
        setSelectedTopic(topic); // Update the state to the new topic
    };

    // Return the selectedTopic state, the handler function, and the state updater function
    return {
        selectedTopic, // The currently selected topic
        handleTopicSelection, // Function to handle topic selection
        setSelectedTopic // Expose the state updater function directly for more flexibility
    };
};

export default useHandleTopicSelection; // Export the custom hook
