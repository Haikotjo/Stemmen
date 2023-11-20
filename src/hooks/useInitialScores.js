import { useEffect, useState } from 'react';

// Define a custom hook called useInitialScores
const useInitialScores = (partiesData) => {
    // useState hook to manage the state of party scores
    const [partyScores, setPartyScores] = useState({});

    useEffect(() => {
        // Initialize the scores
        const initialScores = {};
        // Iterate over each party in partiesData and set their initial score to 0
        partiesData.partijen.forEach((party) => {
            initialScores[party] = 0;
        });
        // Update the state with the initialized scores
        setPartyScores(initialScores);

        // Retrieve stored scores from localStorage when the component loads
        const storedScores = localStorage.getItem('partyScores');
        if (storedScores) {
            // If there are stored scores, parse them and update the state
            setPartyScores(JSON.parse(storedScores));
        }
    }, [partiesData]); // Dependency array includes partiesData to re-run the effect if it changes

    // Return the partyScores state and its updater function
    return [partyScores, setPartyScores];
};

export default useInitialScores; // Export the custom hook
