import React, { useEffect, useRef } from 'react';
import styles from './ParallaxBackground.module.scss';

const ParallaxBackground = ({ backgroundImage }) => {
    const parallaxContainer = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (parallaxContainer.current) {
                const scrollY = window.scrollY || window.pageYOffset;
                parallaxContainer.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={styles.parallax}
            style={{ backgroundImage: `url(${backgroundImage})` }}
            ref={parallaxContainer}
        >
            {/* Inhoud van de parallax-achtergrond */}
        </div>
    );
};

export default ParallaxBackground;
