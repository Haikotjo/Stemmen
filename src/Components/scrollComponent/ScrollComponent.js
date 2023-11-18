import React, { useRef, useState, useEffect } from 'react';
import styles from './ScrollComponent.module.scss';
import StyledButton from "../button/StyledButton";
import {IoIosArrowUp} from "react-icons/io";

const ScrollComponent = ({ scrollRef }) => {
    const scrollPointRef = useRef(null);

    const scrollToRef = () => {
        if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [isVisible, setIsVisible] = useState(false);



    useEffect(() => {
        const checkScrollPosition = () => {
            if (scrollRef && scrollRef.current) {
                const position = scrollRef.current.getBoundingClientRect().top + window.scrollY;
                if (window.scrollY > position) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener('scroll', checkScrollPosition);

        return () => window.removeEventListener('scroll', checkScrollPosition);
    }, [scrollRef]);


    return (
        <div>
            {isVisible && (
                <StyledButton
                    label={<IoIosArrowUp style={{ color: 'white' }} />}
                    onClick={scrollToRef}
                    className={styles.fixedScrollButton} />

            )}
            {/* Andere inhoud van de pagina */}
            <div ref={scrollPointRef}></div>
        </div>
    );
};

export default ScrollComponent;
