import React from 'react';
import textData from '../../data/textData.json';
import styles from './Hompage.module.scss'
import PageDescriptionBlock from "../../Components/pageDescriptionBlock/PageDescriptionBlock";
import {getRandomImage, getRandomImagePage} from "../../utils/utils";
import {useLanguage} from "../../context/LanguageContext";

const HomePage = () => {
    const { language } = useLanguage(); // Gebruik de taalcontext


    const randomImage =  getRandomImage();
    const randomHeaderImage =  getRandomImagePage();

    const routesMap = {
        "positionsPage": "/standpunten-pagina",
        "partiesPage": "/partij-pagina",
        "electionHelper": "/kies-hulp"
    };

    const currentTextData = textData[language];

    return (
        <>
            <div className={styles.headerWrapper}>
                <img src={randomHeaderImage} alt="Header" className={styles.backgroundImage} />
            </div>

            <div className={styles.container}>

                <h1>{language === 'nl' ? 'Welkom bij StemSpectrum' : 'Welcome to StemSpectrum'}</h1>

                <p>{currentTextData.introText}</p>

                <div className={styles.pageDescriptionsContainer}>
                    {Object.entries(currentTextData.pages).map(([key, pageData]) => (
                        <PageDescriptionBlock
                            key={key}
                            route={routesMap[key]}
                            description={pageData.description}
                            title={pageData.name}
                        />
                    ))}
                </div>

                <img src={randomImage} alt="Header" className={styles.backgroundImage} />
                <h2>
                    {language === 'nl' ? 'Verkiezingsinformatie' :
                        language === 'kids' ? 'Info over de verkiezingen.' :
                            'Election Info'}
                </h2>
                <p>{currentTextData.electionInfo}</p>
                <h2>
                    {language === 'nl' ? 'Extra Informatie' :
                        language === 'kids' ? 'Extra Info' :
                            'More Info'}
                </h2>
                <p>{currentTextData.extraStory}</p>
                <img src="/images/backgrounds/goedOfKwaad.png" alt="Achtergrondafbeelding" className={styles.backgroundImage} />
            </div>
        </>
    );
};

export default HomePage;
