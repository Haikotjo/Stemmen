import partiesData from '../data/parties.json';
import positionsData from '../data/positions.json';

// Parties
export const selectParty = (selectedParty) => {
    if (partiesData.partijen.includes(selectedParty)) {
        console.log(`You have selected ${selectedParty}`);
    } else {
        console.log('Invalid selection');
    }
};

// Positions

export const getPositions = (topic, party) => {
    const positionsForTopic = positionsData[topic];

    if (!positionsForTopic) {
        console.log('Invalid topic');
        return;
    }

    const position = positionsForTopic[party];

    if (!position) {
        console.log('Invalid party for this topic');
        return;
    }

    return position;
};