// Importing required modules and components
import React from 'react';
import StyledButton from '../button/StyledButton';
import styles from './PartyList.module.scss';

// PartyList component definition
// It takes three props: parties, selectedParties, and togglePartySelection
const PartyList = ({ parties, selectedParties, togglePartySelection }) => {
    // Helper function to check if a party is selected
    const isSelected = (party) => selectedParties.includes(party);

    // Render the component
    return (
        <div>
            {/*
                Loop through the parties array and render a StyledButton for each party.
                The button label will show "(selected)" next to the party name if it's the selected party.
            */}
            {parties.map((party) => (
                <StyledButton
                    key={party}  // Unique key for each button, required by React
                    label={isSelected(party) ? `${party} (selected)` : party}  // Button label
                    onClick={() => togglePartySelection(party)}  // onClick handler
                    className={isSelected(party) ? styles.selected : ''}  // Conditional styling
                />
            ))}
        </div>
    );
};

// Export the component for use in other files
export default PartyList;
