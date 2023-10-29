import React from 'react';
import textData from '../../data/textData .json';
import logo from '../../assets/images/Stemspectrum.svg';

const HomePage = () => {
    return (
        <div>
            <img src={logo} alt="StemSpectrum Logo" />
            <h1>Welkom bij StemSpectrum</h1>
            <p>{textData.nl.introText}</p>
            <h2>Verkiezingsinformatie</h2>
            <p>{textData.nl.electionInfo}</p>
            <h2>Extra Informatie</h2>
            <p>{textData.nl.extraStory}</p>
        </div>
    );
};

export default HomePage;
