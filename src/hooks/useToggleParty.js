import { useState } from 'react';

// Define a custom hook called useToggleParty
const useToggleParty = () => {
    // useState hook to manage the state of selected parties
    const [selectedParties, setSelectedParties] = useState([]);

    // Function to toggle the selection state of a party
    const togglePartySelection = (party) => {
        setSelectedParties((prevSelectedParties) =>
            // If the party is already selected, remove it from the list
            // Otherwise, add it to the list
            prevSelectedParties.includes(party)
                ? prevSelectedParties.filter((p) => p !== party)
                : [...prevSelectedParties, party]
        );
    };

    // Function to reset the selection of parties
    const resetSelectedParties = () => {
        setSelectedParties([]); // Reset the state to an empty array
    };

    // Return the selectedParties state, the toggle function, and the reset function
    return {
        selectedParties, // The currently selected parties
        togglePartySelection, // Function to toggle party selection
        resetSelectedParties, // Function to reset party selections
    };
};

export default useToggleParty; // Export the custom hook
