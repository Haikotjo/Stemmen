import { useContext } from 'react';
import { ScoreContext } from "../context/ScoreContext"; // Import ScoreContext

// Define a custom hook called useUndoAnswer
const useUndoAnswer = () => {
    // Access state and state update functions from ScoreContext
    const { partyScores, setPartyScores, answeredQuestions, setAnsweredQuestions } = useContext(ScoreContext);

    // Define arrays of strings representing positive and negative answers
    const positiveAnswers = ['Eens', 'Agree', 'Ja goed plan!'];
    const negativeAnswers = ['Oneens', 'Disagree', 'Nee', 'Nee joh!'];

    // Function to undo an answer
    const undoAnswer = (party, topic) => {
        // Create a copy of answeredQuestions and remove the specified answer
        const newAnsweredQuestions = { ...answeredQuestions };
        const previousAnswer = newAnsweredQuestions[`${topic}_${party}`];
        delete newAnsweredQuestions[`${topic}_${party}`];

        // Create a copy of partyScores and adjust the score based on the undone answer
        const newPartyScores = { ...partyScores };
        // Undo a positive answer
        if (positiveAnswers.includes(previousAnswer)) {
            newPartyScores[party] = (newPartyScores[party] || 0) - 1;
        }
        // Undo a negative answer
        else if (negativeAnswers.includes(previousAnswer)) {
            newPartyScores[party] = (newPartyScores[party] || 0) + 1;
        }

        // Update the states with new values
        setAnsweredQuestions(newAnsweredQuestions);
        setPartyScores(newPartyScores);

        // Persist the new states to localStorage
        localStorage.setItem('answeredQuestions', JSON.stringify(newAnsweredQuestions));
        localStorage.setItem('partyScores', JSON.stringify(newPartyScores));
    };

    // Return the undoAnswer function
    return undoAnswer;
};

export default useUndoAnswer; // Export the custom hook
