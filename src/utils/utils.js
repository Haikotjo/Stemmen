import partiesData from '../data/parties.json'; // Import party data from a JSON file
import positionsData from '../data/positions.json'; // Import positions data from a JSON file

// Function to select a party
export const selectParty = (selectedParty) => {
    // Check if the selected party exists in the parties data
    if (partiesData.partijen.includes(selectedParty)) {
        // Code to handle if the selected party is found
    } else {
        // Code to handle if the selected party is not found
    }
};

// Function to get positions based on a topic, party, and language
export const getPositions = (topic, party, language) => {
    // Retrieve positions for a specific topic and language
    const positionsForTopic = positionsData[language][topic];

    // Check if there are positions for the given topic
    if (!positionsForTopic) {
        // If not, return early
        return;
    }

    // Retrieve the position for the specified party
    const position = positionsForTopic[party];

    // Check if there is a position for the specified party
    if (!position) {
        // If not, return early
        return;
    }

    // Return the position
    return position;
};

// Function to select a topic
export const selectTopic = (selectedTopic) => {
    // Check if the selected topic exists in the positions data
    if (Object.keys(positionsData).includes(selectedTopic)) {
        // Code to handle if the selected topic is found
    } else {
        // Code to handle if the selected topic is not found
    }
};

// Array of header image names
const headerImages = ['eenSoortToespraak', 'GroteToespraak', 'toespraak']; // Names of images without the extension

// Function to get a random header image
export const getRandomImage = () => {
    // Generate a random index based on the length of the headerImages array
    const randomIndex = Math.floor(Math.random() * headerImages.length);
    // Return the path of the randomly selected image
    return `/images/headers/${headerImages[randomIndex]}.png`;
};

// Array of random image names
const randomImages = ['allemaal', 'banner kies', 'echtGeenIdee', 'goedOfKwaad', 'keuzes', 'kiezen', 'welkeKantOp']; // Names of images without the extension

// Function to get a random image for a page
export const getRandomImagePage = () => {
    // Generate a random index based on the length of the randomImages array
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    // Return the path of the randomly selected image
    return `/images/backgrounds/${randomImages[randomIndex]}.png`;
};

// Function to get the image path based on the party name
export const getPartyImage = (party) => {
    // Convert the party name to lowercase and remove spaces
    const imageName = party.toLowerCase().replace(/\s+/g, '') + '.png';
    // Return the full path to the party image
    return `${process.env.PUBLIC_URL}/images/puppets/${imageName}`;
};
