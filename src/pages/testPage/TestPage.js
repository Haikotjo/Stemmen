import React, { useContext } from 'react';
import { ScoreContext } from '../../context/ScoreContext'; // Zorg dat dit pad klopt!

const TestPage = () => {
    // Haal partyScores uit de context
    const { partyScores } = useContext(ScoreContext);

    return (
        <div>
            <h1>Testpagina</h1>
            <p>Dit is een testpagina met parallax-effect.</p>
            <h2>Scores:</h2>
            <ul>
                {Object.entries(partyScores).map(([party, score]) => (
                    <li key={party}>{party}: {score}</li>
                ))}
            </ul>
        </div>
    );
};

export default TestPage;
