// useUndoAnswer.js
import { useContext } from 'react';
import { ScoreContext } from "../context/ScoreContext";

const useUndoAnswer = () => {
    const { partyScores, setPartyScores, answeredQuestions, setAnsweredQuestions } = useContext(ScoreContext);

    const undoAnswer = (party, topic) => {
        const newAnsweredQuestions = { ...answeredQuestions };
        const previousAnswer = newAnsweredQuestions[`${topic}_${party}`];
        delete newAnsweredQuestions[`${topic}_${party}`];

        const newPartyScores = { ...partyScores };
        if (previousAnswer === 'Eens') {
            newPartyScores[party] = (newPartyScores[party] || 0) - 1;
        } else if (previousAnswer === 'Oneens') {
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
