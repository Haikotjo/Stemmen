import { useContext } from 'react';
import { ScoreContext } from "../context/ScoreContext"; // Import the ScoreContext

// Define a custom hook called useHandleAnswer
const useHandleAnswer = () => {
    // Access state and state update functions from ScoreContext
    const { partyScores, setPartyScores, answeredQuestions, setAnsweredQuestions } = useContext(ScoreContext);

    // Define arrays of strings representing positive and negative answers
    const positiveAnswers = ['Eens', 'Agree', 'Ja goed plan!'];
    const negativeAnswers = ['Oneens', 'Disagree', 'Nee', 'Nee joh!'];

    // Return a function that handles an answer
    return (party, topic, answer) => {
        // Create a copy of answeredQuestions and update it with the new answer
        const newAnsweredQuestions = {...answeredQuestions};
        newAnsweredQuestions[`${topic}_${party}`] = answer;

        // Create a copy of partyScores and initialize score for a party if not present
        const newPartyScores = {...partyScores};
        if (!newPartyScores[party]) {
            newPartyScores[party] = 0;
        }

        // Check if the answer is positive or negative and update the score accordingly
        if (positiveAnswers.includes(answer)) {
            newPartyScores[party] += 1; // Increment score for positive answers
        } else if (negativeAnswers.includes(answer)) {
            newPartyScores[party] -= 1; // Decrement score for negative answers
        }

        // Update the states with new values
        setAnsweredQuestions(newAnsweredQuestions);
        setPartyScores(newPartyScores);

        // Persist the new states to localStorage
        localStorage.setItem('answeredQuestions', JSON.stringify(newAnsweredQuestions));
        localStorage.setItem('partyScores', JSON.stringify(newPartyScores));
    };
};

export default useHandleAnswer; // Export the custom hook
