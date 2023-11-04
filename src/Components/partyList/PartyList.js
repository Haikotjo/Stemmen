// Importing required modules and components
import React from 'react';
import StyledButton from '../button/StyledButton';
import styles from './PartyList.module.scss';

// PartyList component definition
// It takes three props: parties, selectedParties, and togglePartySelection
const PartyList = ({ parties, selectedParties, togglePartySelection }) => {
    // Helper function to determine if a party is selected
    const isSelected = (party) => selectedParties.includes(party);

    // Function to get the image path based on the party name
// Converts the party name to lowercase and replaces spaces with nothing
// Then appends '.png' to match the image file extension
    const getPartyImage = (party) => {
        const imageName = party.toLowerCase().replace(/\s+/g, '') + '.png';
        // Build the path to the image in the public folder
        return `${process.env.PUBLIC_URL}/images/puppets/${imageName}`;
    };

    // Render the component
    return (
        <div className={styles.partyListContainer}>
            {/* Loop through the parties array and render a button and image for each party */}
            {parties.map((party) => {
                // Check if the current party is selected
                const partyIsSelected = isSelected(party);
                // Get the image for the current party
                const partyImage = getPartyImage(party);

                return (
                    <div key={party} className={`${styles.partyItem} ${partyIsSelected ? styles.selected : ''}`}>
                        {/* Render the party image */}
                        <img
                            src={getPartyImage(party)}
                            alt={`${party} logo`}
                            className={styles.partyImage}
                            onError={(e) => { e.target.onerror = null; e.target.src = `${process.env.PUBLIC_URL}/images/puppets/default.png`; }}
                        />
                        {/* Render the button with conditional styling and label */}
                        <StyledButton
                            label={partyIsSelected ? `${party} ` : party}
                            onClick={() => togglePartySelection(party)}
                            className={partyIsSelected ? styles.selectedButton : ''}
                        />
                    </div>
                );
            })}
        </div>
    );
};

// Export the component for use in other files
export default PartyList;
