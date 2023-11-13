// useHandleAnswer.js
import { useContext } from 'react';
import {ScoreContext} from "../context/ScoreContext";


const useHandleAnswer = () => {

    const { partyScores, setPartyScores, answeredQuestions, setAnsweredQuestions } = useContext(ScoreContext);

    const positiveAnswers = ['Eens', 'Agree', 'Ja goed plan!'];
    const negativeAnswers = ['Oneens', 'Disagree', 'Nee', 'Nee joh!'];

    const handleAnswer = (party, topic, answer) => {
        const newAnsweredQuestions = { ...answeredQuestions };
        newAnsweredQuestions[`${topic}_${party}`] = answer;

        const newPartyScores = { ...partyScores };
        if (!newPartyScores[party]) {
            newPartyScores[party] = 0;
        }

        // Controleer of het antwoord positief of negatief is
        if (positiveAnswers.includes(answer)) {
            newPartyScores[party] += 1;
        } else if (negativeAnswers.includes(answer)) {
            newPartyScores[party] -= 1;
        }

        setAnsweredQuestions(newAnsweredQuestions);
        setPartyScores(newPartyScores);

        localStorage.setItem('answeredQuestions', JSON.stringify(newAnsweredQuestions));
        localStorage.setItem('partyScores', JSON.stringify(newPartyScores));
    };

    return handleAnswer;
};

export default useHandleAnswer;
