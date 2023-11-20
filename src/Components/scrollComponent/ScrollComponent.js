import React, { useRef, useState, useEffect } from 'react';
import styles from './ScrollComponent.module.scss'; // Import module-specific styles
import StyledButton from "../button/StyledButton"; // Import a custom styled button component
import { IoIosArrowUp } from "react-icons/io"; // Import an icon from react-icons library

const ScrollComponent = ({ scrollRef }) => {
    const scrollPointRef = useRef(null); // Create a reference to track a specific DOM element

    // Function to scroll to the element referred by `scrollRef`
    const scrollToRef = () => {
        if (scrollRef && scrollRef.current) {
            // If the scrollRef is defined and points to a current DOM element
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            // Use the scrollIntoView method to smoothly scroll to the referenced element
        }
    };

    const [isVisible, setIsVisible] = useState(false); // State to track visibility of the button

    useEffect(() => {
        // Effect hook to add and clean up the scroll event listener
        const checkScrollPosition = () => {
            // Function to check the scroll position relative to the scrollRef element
            if (scrollRef && scrollRef.current) {
                // If scrollRef is defined and has a current DOM element
                const position = scrollRef.current.getBoundingClientRect().top + window.scrollY;
                // Calculate the position of the scrollRef element from the top of the viewport
                if (window.scrollY > position) {
                    // If the current scroll position is greater than the position of scrollRef element
                    setIsVisible(true); // Make the button visible
                } else {
                    setIsVisible(false); // Hide the button
                }
            }
        };

        window.addEventListener('scroll', checkScrollPosition); // Add scroll event listener to window

        // Clean-up function to remove the event listener
        return () => window.removeEventListener('scroll', checkScrollPosition);
    }, [scrollRef]); // Dependency array includes scrollRef to re-run the effect when it changes

    return (
        <div>
            {isVisible && ( // Conditional rendering based on `isVisible` state
                <StyledButton
                    label={<IoIosArrowUp style={{ color: 'white' }} />} // Button label with an upward arrow icon
                    onClick={scrollToRef} // OnClick event to trigger scrollToRef function
                    className={styles.fixedScrollButton} /> // Apply specific styles for the button
            )}
            {/* Other contents of the page */}
            {/*Reference point for scroll actions*/}
            <div ref={scrollPointRef}></div>
        </div>
    );
};

export default ScrollComponent; // Export the component for use in other parts of the application
