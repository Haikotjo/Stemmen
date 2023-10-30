import React, { useState } from 'react';
// Importing the PartyList component to display the list of parties
import PartyList from "../../Components/partyList/PartyList";
// Importing the PartyPosition component to display the positions of the selected party
import PartyPosition from "../../Components/partyPosition/PartyPosition";
// Importing the custom hook to get the positions and topics based on the selected party
import usePartyPositions from "../../hooks/usePartyPositions";
// Importing the parties data from a JSON file
import partiesData from '../../data/parties.json';

// Main PartiesPage component
function PartiesPage() {
    // State to keep track of the selected party
    const [selectedParty, setSelectedParty] = useState(null);
    // Using the custom hook to get the positions and current topics based on the selected party
    const [positions] = usePartyPositions(selectedParty);

    // Function to handle the selection of a party
    const handlePartySelection = (party) => {
        setSelectedParty(party);
    };

    return (
        <div className="PartiesPage">
            {/* Displaying the list of parties using the PartyList component */}
            <PartyList
                parties={partiesData.partijen} // Using the parties from parties.json
                selectedParties={[selectedParty]} // The currently selected party
                togglePartySelection={handlePartySelection} // Function to change the selected party
            />

            {/* Displaying the name of the selected party, if any */}
            {selectedParty && <h1>Selected Party: {selectedParty}</h1>}

            {/* Displaying the positions of the selected party using the PartyPosition component */}
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
