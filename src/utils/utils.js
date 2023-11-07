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


// Radom images
const headerImages = ['eenSoortToespraak', 'GroteToespraak', 'toespraak', ]; // Namen van je afbeeldingen zonder de extensie

export const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * headerImages.length);
    return `/images/headers/${headerImages[randomIndex]}.png`;
};


// Radom images
const randomImages = ['allemaal', 'banner kies', 'echtGeenIdee', 'goedOfKwaad', 'keuzes', 'kiezen', 'welkeKantOp' ]; // Namen van je afbeeldingen zonder de extensie

export const getRandomImagePage = () => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    return `/images/backgrounds/${randomImages[randomIndex]}.png`;
};

// Function to get the image path based on the party name
// Converts the party name to lowercase and replaces spaces with nothing
// Then appends '.png' to match the image file extension
export const getPartyImage = (party) => {
    const imageName = party.toLowerCase().replace(/\s+/g, '') + '.png';
    return `${process.env.PUBLIC_URL}/images/puppets/${imageName}`;
};