import { useState, useEffect } from 'react';
import positionsData from '../data/positions.json';
import partiesData from '../data/parties.json';

function usePositions(selectedTopic) {
    const [positions, setPositions] = useState({});

    useEffect(() => {
        if (selectedTopic) {
            const newPositions = {};
            partiesData.partijen.forEach((party) => {
                const position = positionsData[selectedTopic][party];
                if (position) {
                    newPositions[party] = position;
                }
            });
            setPositions(newPositions);
        }
    }, [selectedTopic]);

    return positions;
}

export default usePositions;
