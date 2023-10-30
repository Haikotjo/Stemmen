import { useEffect, useState } from 'react';
import { getPositions } from '../utils/utils';
import positionsData from '../data/positions.json';
import partiesData from '../data/parties.json';

function usePartyPositions(selectedParty) {
    const [positions, setPositions] = useState({});
    const [currentTopics, setCurrentTopics] = useState([]);

    useEffect(() => {
        if (selectedParty) {
            const newPositions = {};
            const newTopics = [];
            Object.keys(positionsData).forEach((topic) => {
                const position = getPositions(topic, selectedParty);
                newPositions[topic] = position;
                newTopics.push(topic);
            });
            setPositions(newPositions);
            setCurrentTopics(newTopics);
        }
    }, [selectedParty]);

    return [positions, currentTopics];
}

export default usePartyPositions;
