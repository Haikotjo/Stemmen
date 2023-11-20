import { useContext } from 'react';
import useToggleParty from './useToggleParty'; // Import custom hook for toggling party selection
import useHandleTopicSelection from './useHandleTopicSelection'; // Import custom hook for handling topic selection
import { ScoreContext } from "../context/ScoreContext"; // Import ScoreContext

// Define a custom hook called useReset
const useReset = () => {
    // Access functions from other custom hooks and context
    const { resetSelectedParties } = useToggleParty();
    const { setSelectedTopic } = useHandleTopicSelection(); // Ensure this function exists in useHandleTopicSelection
    const { setPartyScores, setAnsweredQuestions } = useContext(ScoreContext);

    // Define the reset function
    const reset = () => {
        // Safety check to ensure setSelectedTopic is a function
        if (typeof setSelectedTopic !== 'function') {
            console.error('setSelectedTopic is not a function');
            return;
        }

        // Confirm with the user before resetting
        if (window.confirm("Weet je zeker dat je alles wilt resetten en opnieuw wilt beginnen?")) {
            resetSelectedParties(); // Reset selected parties
            setSelectedTopic(null); // Reset the selected topic
            setPartyScores({}); // Reset party scores
            setAnsweredQuestions({}); // Reset answered questions

            // Remove stored data from localStorage
            localStorage.removeItem('answeredQuestions');
            localStorage.removeItem('partyScores');
        }
    };

    // Return the reset function
    return reset;
};

export default useReset; // Export the custom hook
