import React from 'react';
import textData from '../../data/textData.json'; // Import text data from a JSON file
import styles from './Hompage.module.scss'; // Import CSS module for styling
import PageDescriptionBlock from "../../Components/pageDescriptionBlock/PageDescriptionBlock"; // Import a reusable component for page descriptions
import { getRandomImage, getRandomImagePage } from "../../utils/utils"; // Import utility functions for images
import { useLanguage } from "../../context/LanguageContext"; // Import the language context hook
import PageHeader from "../../Components/pageHeader/PageHeader"; // Import a reusable page header component

const HomePage = () => {
    // Access language state and updater function from the language context
    const { language, setLanguage } = useLanguage();

    // Get random images for use in the page
    const randomImage = getRandomImage();
    const randomHeaderImage = getRandomImagePage();

    // Define a mapping of route names to URLs
    const routesMap = {
        "positionsPage": "/standpunten-pagina",
        "partiesPage": "/partij-pagina",
        "electionHelper": "/kies-hulp"
    };

    // Access text data specific to the current language
    const currentTextData = textData[language];

    // Function to toggle between Dutch and 'kids' language
    const toggleLanguageToKidsOrDutch = () => {
        const newLanguage = language === 'kids' ? 'nl' : 'kids';
        setLanguage(newLanguage);
    };

    return (
        <>
            <div className={styles.container}>
                {/* Render the page header with a random image */}
                <PageHeader imageSrc={randomHeaderImage} />

                {/* Display the main title, which changes based on the current language */}
                <h1 className={styles.homeTitle}>
                    {language === 'nl' ? 'Welkom bij StemSpectrum' : 'Welcome to StemSpectrum'}
                </h1>

                {/* Introduction text from the text data */}
                <p className={styles.introText}>{currentTextData.introText}</p>

                {/* Toggle link for switching language */}
                <h3 className={styles.version}>
                    {currentTextData.kids}
                    <span className={styles.kidsLink} onClick={toggleLanguageToKidsOrDutch}> >>></span>
                </h3>

                {/* Dynamically generate page description blocks based on the current text data */}
                <div className={styles.pageDescriptionsContainer}>
                    {Object.entries(currentTextData.pages)
                        .filter(([key, _]) => routesMap[key])
                        .map(([key, pageData]) => (
                            <PageDescriptionBlock
                                key={key}
                                route={routesMap[key]}
                                description={pageData.description}
                                title={pageData.name}
                            />
                        ))}
                </div>

                {/* Render a random image as a background */}
                <img src={randomImage} alt="Header" className={styles.backgroundImage} />

                {/* Election information heading, which changes based on the current language */}
                <h2>
                    {language === 'nl' ? 'Verkiezingsinformatie' :
                        language === 'kids' ? 'Info over de verkiezingen.' :
                            'Election Info'}
                </h2>

                {/* Election information text from the text data */}
                <p>{currentTextData.electionInfo}</p>

                {/* Additional information heading, which changes based on the current language */}
                <h2>
                    {language === 'nl' ? 'Extra Informatie' :
                        language === 'kids' ? 'Extra Info' :
                            'More Info'}
                </h2>

                {/* Additional story text from the text data */}
                <p>{currentTextData.extraStory}</p>

                {/* Static background image */}
                <img src="/images/backgrounds/goedOfKwaad.png" alt="Achtergrondafbeelding" className={styles.backgroundImage} />
            </div>
        </>
    );
};

export default HomePage; // Export the HomePage component
