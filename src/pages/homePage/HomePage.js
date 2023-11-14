import React from 'react';
import textData from '../../data/textData.json';
import styles from './Hompage.module.scss'
import PageDescriptionBlock from "../../Components/pageDescriptionBlock/PageDescriptionBlock";
import {getRandomImage, getRandomImagePage} from "../../utils/utils";
import {useLanguage} from "../../context/LanguageContext";
import { MdArrowForwardIos } from "react-icons/md";
const HomePage = () => {
    const { language, setLanguage } = useLanguage(); // Gebruik de taalcontext
    const randomImage =  getRandomImage();
    const randomHeaderImage =  getRandomImagePage();

    const routesMap = {
        "positionsPage": "/standpunten-pagina",
        "partiesPage": "/partij-pagina",
        "electionHelper": "/kies-hulp"
    };

    const translations = {
        nl: {
            kids: "Zijn de jongeren ook geïnteresseerd in politiek? Probeer dan onze speciale 'Kids' versie met teksten die speciaal zijn afgestemd op jongeren",
        },
        en: {
            kids: "These are the parties you most agree with",
        },
        kids: {
            kids: "Wil je dit een keer aan de oudjes laten zien? Probeer dan onze versie voor ouderen.",
        },
    };

    const t = translations[language];

    const currentTextData = textData[language];

    const toggleLanguageToKidsOrDutch = () => {
        const newLanguage = language === 'kids' ? 'nl' : 'kids';
        setLanguage(newLanguage);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.headerWrapper}>
                    <img src={randomHeaderImage} alt="Header" className={styles.backgroundImage} />
                </div>
                <h1 className={styles.homeTitle}>{language === 'nl' ? 'Welkom bij StemSpectrum' : 'Welcome to StemSpectrum'}</h1>

                <p className={styles.introText}>{currentTextData.introText}</p>

                <h3 className={styles.version} >{t.kids }  <span className={styles.kidsLink} onClick={toggleLanguageToKidsOrDutch}> >>></span></h3>


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
