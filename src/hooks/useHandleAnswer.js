// useHandleAnswer.js
import { useContext } from 'react';
import {ScoreContext} from "../context/ScoreContext";


const useHandleAnswer = () => {
    const { partyScores, setPartyScores, answeredQuestions, setAnsweredQuestions } = useContext(ScoreContext);

    const handleAnswer = (party, topic, answer) => {
        const newAnsweredQuestions = { ...answeredQuestions };
        newAnsweredQuestions[`${topic}_${party}`] = answer;

        const newPartyScores = { ...partyScores };
        if (!newPartyScores[party]) {
            newPartyScores[party] = 0;
        }

        if (answer === 'Eens') {
            newPartyScores[party] += 1;
        } else if (answer === 'Oneens') {
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
