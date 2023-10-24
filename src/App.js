import React, { useEffect, useState } from 'react';
import { selectParty, getPositions } from './utils/utils';

function App() {
    const [selectedParty, setSelectedParty] = useState(null);

    useEffect(() => {
        if (selectedParty) {
            // Gebruik de selectParty functie met de geselecteerde partij
            selectParty(selectedParty);

            // Gebruik de getPositions functie met de geselecteerde partij
            const position = getPositions('Onderwerp1', selectedParty);
            console.log(`Position of ${selectedParty} on Topic 1: ${position}`);
        }
    }, [selectedParty]);

    const handlePartySelection = (party) => {
        setSelectedParty(party);
    };

    return (
        <div className="App">
            <button onClick={() => handlePartySelection('VVD')}>VVD</button>
            <button onClick={() => handlePartySelection('NSC')}>NSC</button>
            <button onClick={() => handlePartySelection('GroenlinksPVDAA')}>GroenlinksPVDA</button>
            <div>
                <p></p>
            </div>
        </div>
    );
}

export default App;
