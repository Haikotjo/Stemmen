import React from 'react';
import textData from '../../data/textData.json';
import logo from '../../assets/images/Stemspectrum.svg';
import styles from './Hompage.module.scss'
import PageDescriptionBlock from "../../Components/pageDescriptionBlock/PageDescriptionBlock";

const HomePage = () => {
    const routesMap = {
        "positionsPage": "/standpunten-pagina",
        "partiesPage": "/partij-pagina",
        "electionHelper": "/kies-hulp"
    };

    return (
        <div className={styles.container}>
            <img src={logo} alt="StemSpectrum Logo" className={styles.logo} />
            <h1>Welkom bij StemSpectrum</h1>
            <p>{textData.nl.introText}</p>
            <h2>Verkiezingsinformatie</h2>
            <p>{textData.nl.electionInfo}</p>
            <h2>Extra Informatie</h2>
            <p>{textData.nl.extraStory}</p>
            <h2>Pagina Beschrijvingen</h2>
            <div className={styles.pageDescriptionsContainer}>
                {Object.entries(textData.nl.pageDescriptions).map(([key, value]) => (
                    <PageDescriptionBlock key={key} route={routesMap[key]} description={value} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
