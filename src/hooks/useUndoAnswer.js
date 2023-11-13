import { useContext } from 'react';
import { ScoreContext } from "../context/ScoreContext";

const useUndoAnswer = () => {
    const { partyScores, setPartyScores, answeredQuestions, setAnsweredQuestions } = useContext(ScoreContext);

    const positiveAnswers = ['Eens', 'Agree', 'Ja goed plan!'];
    const negativeAnswers = ['Oneens', 'Disagree', 'Nee', 'Nee joh!'];

    const undoAnswer = (party, topic) => {
        const newAnsweredQuestions = { ...answeredQuestions };
        const previousAnswer = newAnsweredQuestions[`${topic}_${party}`];
        delete newAnsweredQuestions[`${topic}_${party}`];

        const newPartyScores = { ...partyScores };
        // Ongedaan maken van een positief antwoord
        if (positiveAnswers.includes(previousAnswer)) {
            newPartyScores[party] = (newPartyScores[party] || 0) - 1;
        }
        // Ongedaan maken van een negatief antwoord
        else if (negativeAnswers.includes(previousAnswer)) {
            newPartyScores[party] = (newPartyScores[party] || 0) + 1;
        }

        setAnsweredQuestions(newAnsweredQuestions);
        setPartyScores(newPartyScores);

        localStorage.setItem('answeredQuestions', JSON.stringify(newAnsweredQuestions));
        localStorage.setItem('partyScores', JSON.stringify(newPartyScores));
    };

    return undoAnswer;
};

export default useUndoAnswer;
