// Importing required modules
import { useState, useEffect } from 'react';
import positionsData from '../data/positions.json';
import partiesData from '../data/parties.json';

// Custom hook to manage positions based on the selected topic
function usePositions(selectedTopic) {
    // State to hold the positions data
    const [positions, setPositions] = useState({});

    // Effect to update positions when the selected topic changes
    useEffect(() => {
        // Only proceed if a topic is selected
        if (selectedTopic) {
            // Initialize an empty object to hold new positions
            const newPositions = {};

            // Loop through each party to find their position on the selected topic
            partiesData.partijen.forEach((party) => {
                const position = positionsData[selectedTopic][party];

                // Only add the position if it exists
                if (position) {
                    newPositions[party] = position;
                }
            });

            // Update the state with new positions
            setPositions(newPositions);
        }
    }, [selectedTopic]); // Dependency array

    // Return the positions data
    return positions;
}

// Export the custom hook for use in other files
export default usePositions;
