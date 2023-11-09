// hooks/useToggleParty.js
import { useState } from 'react';

const useToggleParty = () => {
    const [selectedParties, setSelectedParties] = useState([]);

    const togglePartySelection = (party) => {
        setSelectedParties((prevSelectedParties) =>
            prevSelectedParties.includes(party)
                ? prevSelectedParties.filter((p) => p !== party)
                : [...prevSelectedParties, party]
        );
    };

    const resetSelectedParties = () => {
        setSelectedParties([]);
    };

    return {
        selectedParties,
        togglePartySelection,
        resetSelectedParties,
    };
};

export default useToggleParty;
