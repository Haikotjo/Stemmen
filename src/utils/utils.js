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

export const selectTopic = (selectedTopic) => {
    if (Object.keys(positionsData).includes(selectedTopic)) {
        console.log(`You have selected ${selectedTopic}`);
    } else {
        console.log('Invalid topic');
    }
};

const headerImages = ['eenSoortToespraak', 'GroteToespraak', 'toespraak']; // Namen van je afbeeldingen zonder de extensie

export const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * headerImages.length);
    return `/images/headers/${headerImages[randomIndex]}.png`;
};