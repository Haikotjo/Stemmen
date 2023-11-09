// useReset.js
import { useContext } from 'react';
import useToggleParty from './useToggleParty';
import useHandleTopicSelection from './useHandleTopicSelection';
import {ScoreContext} from "../context/ScoreContext";


const useReset = () => {
    const { resetSelectedParties } = useToggleParty();
    const { setSelectedTopic } = useHandleTopicSelection(); // Zorg ervoor dat deze functie bestaat
    const { setPartyScores, setAnsweredQuestions } = useContext(ScoreContext);

    const reset = () => {
        // Voeg een veiligheidscontrole toe
        if (typeof setSelectedTopic !== 'function') {
            console.error('setSelectedTopic is not a function');
            return;
        }

        if (window.confirm("Weet je zeker dat je alles wilt resetten en opnieuw wilt beginnen?")) {
            resetSelectedParties();
            setSelectedTopic(null);
            setPartyScores({});
            setAnsweredQuestions({});

            localStorage.removeItem('answeredQuestions');
            localStorage.removeItem('partyScores');
        }
    };

    return reset;
};

export default useReset;
