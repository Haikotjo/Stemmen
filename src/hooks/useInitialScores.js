import { useEffect, useState } from 'react';

const useInitialScores = (partiesData) => {
    const [partyScores, setPartyScores] = useState({});

    useEffect(() => {
        // Initialiseer de scores
        const initialScores = {};
        partiesData.partijen.forEach((party) => {
            initialScores[party] = 0;
        });
        setPartyScores(initialScores);

        // Ophalen van opgeslagen scores uit localStorage bij het laden van de component
        const storedScores = localStorage.getItem('partyScores');
        if (storedScores) {
            setPartyScores(JSON.parse(storedScores));
        }
    }, [partiesData]);

    return [partyScores, setPartyScores];
};

export default useInitialScores;
