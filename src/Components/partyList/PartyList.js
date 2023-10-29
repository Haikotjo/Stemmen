import React from 'react';
import StyledButton from '../button/StyledButton';
import styles from './PartyList.module.scss';

const PartyList = ({ parties, selectedParties, togglePartySelection }) => {
    const isSelected = (party) => selectedParties.includes(party);

    return (
        <div>
            {parties.map((party) => (
                <StyledButton
                    key={party}
                    label={isSelected(party) ? `${party} (selected)` : party}
                    onClick={() => togglePartySelection(party)}
                    className={isSelected(party) ? styles.selected : ''}
                />
            ))}
        </div>
    );
};

export default PartyList;
