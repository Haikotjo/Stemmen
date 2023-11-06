import React from 'react';
import textData from '../../data/textData.json';
import styles from './Hompage.module.scss'
import PageDescriptionBlock from "../../Components/pageDescriptionBlock/PageDescriptionBlock";

const HomePage = () => {
    const routesMap = {
        "positionsPage": "/standpunten-pagina",
        "partiesPage": "/partij-pagina",
        "electionHelper": "/kies-hulp"
    };

    return (
        <div>
            <img src="/images/backgrounds/welkeKantOp.png" alt="Achtergrondafbeelding" className={styles.backgroundImage} />
            {/* Andere inhoud van de pagina hier */}

            <div className={styles.container}>
                <h1>Welkom bij StemSpectrum</h1>
                <p>{textData.nl.introText}</p>
                <h2>Verkiezingsinformatie</h2>
                <p>{textData.nl.electionInfo}</p>
                <img src="/images/backgrounds/echtGeenIdee.png" alt="Achtergrondafbeelding" className={styles.backgroundImage} />
                <h2>Extra Informatie</h2>
                <p>{textData.nl.extraStory}</p>
                <h2>Pagina Beschrijvingen</h2>
                <div className={styles.pageDescriptionsContainer}>
                    {Object.entries(textData.nl.pageDescriptions).map(([key, value]) => (
                        <PageDescriptionBlock key={key} route={routesMap[key]} description={value} />
                    ))}
                </div>
                <img src="/images/backgrounds/goedOfKwaad.png" alt="Achtergrondafbeelding" className={styles.backgroundImage} />
            </div>
        </div>
    );
};

export default HomePage;
