const PartyScores = ({ partyScores }) => {
    return (
        <div>
            <h2>Party Scores</h2>
            {Object.keys(partyScores).map((party) => (
                <div key={party}>
                    {party}: {partyScores[party]}
                </div>
            ))}
        </div>
    );
};

export default PartyScores;
