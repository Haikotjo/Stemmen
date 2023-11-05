import React, { useEffect, useRef, useState } from 'react';
import styles from './ParallaxBackground.module.scss';

const ParallaxBackground = ({ backgroundImage }) => {
    const parallaxContainer = useRef(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY || window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const windowHeight = window.innerHeight; // Hoogte van het venster
    const backgroundHeight = windowHeight; // Hoogte van de achtergrond gelijk aan het venster
    const backgroundPositionY = -scrollY * 0.5; // Aanpassen van de parallax-snelheid

    return (
        <div
            className={styles.parallax}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: `center ${backgroundPositionY}px`, // Aanpassen van de Y-positie van de achtergrond
                backgroundSize: `auto ${backgroundHeight}px`, // Aanpassen van de hoogte van de achtergrond
            }}
            ref={parallaxContainer}
        >
            {/* Inhoud van de parallax-achtergrond */}
        </div>
    );
};

export default ParallaxBackground;
