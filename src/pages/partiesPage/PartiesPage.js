import React, { useState } from 'react';
import PartyList from "../../Components/partyList/PartyList";
import PartyPosition from "../../Components/partyPosition/PartyPosition";
import usePartyPositions from "../../hooks/usePartyPositions";
import partiesData from '../../data/parties.json';

function PartiesPage() {
    const [selectedParty, setSelectedParty] = useState(null);
    const [positions, currentTopics] = usePartyPositions(selectedParty);

    const handlePartySelection = (party) => {
        setSelectedParty(party);
    };

    return (
        <div className="PartiesPage">
            <PartyList
                parties={partiesData.partijen} // Gebruik de partijen uit parties.json
                selectedParties={[selectedParty]} // Je huidige geselecteerde partij
                togglePartySelection={handlePartySelection} // Je functie om de selectie te veranderen
            />

            {selectedParty && <h1>Selected Party: {selectedParty}</h1>}

            {Object.keys(positions).map((topic) => (
                <PartyPosition
                    key={topic}
                    topic={topic}
                    position={positions[topic]}
                />
            ))}
        </div>
    );
}
export default PartiesPage;
