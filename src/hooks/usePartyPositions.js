import { useEffect, useState} from 'react';
// Importing utility function to get positions based on topic and selected party
import { getPositions } from '../utils/utils';
// Importing positions data from a JSON file
import positionsData from '../data/positions.json';

import { useLanguage } from '../context/LanguageContext';

// Custom hook to get positions and current topics based on the selected party
function usePartyPositions(selectedParty) {
    // State to store the positions of the selected party
    const [positions, setPositions] = useState({});
    // State to store the current topics related to the selected party
    const [currentTopics, setCurrentTopics] = useState([]);

    const { language } = useLanguage();

    // useEffect to update positions and current topics when the selected party changes
    useEffect(() => {
        // Check if a party is selected
        if (selectedParty) {
            // Temporary object to store the new positions
            const newPositions = {};
            // Temporary array to store the new topics
            const newTopics = [];
            // Loop through all topics in the positions data

            const positionsDataForLanguage = positionsData[language] || positionsData.nl;

            Object.keys(positionsDataForLanguage).forEach((topic) => {
                // Get the position of the selected party for the current topic
                const position = getPositions(topic, selectedParty, language);
                // Update the new positions object
                newPositions[topic] = position;
                // Update the new topics array
                newTopics.push(topic);
            });
            // Update the state with the new positions
            setPositions(newPositions);
            // Update the state with the new topics
            setCurrentTopics(newTopics);
        }
    }, [selectedParty, language]); // Dependency array, re-run the effect if selectedParty changes

    // Return the positions and current topics
    return [positions, currentTopics];
}

export default usePartyPositions;
