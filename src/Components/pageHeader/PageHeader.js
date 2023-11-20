import React, {useState} from 'react';
import styles from './PageHeader.module.scss';

// PageHeader Component
// This component is used for displaying a page header with an image and a title.
// Props:
//   imageSrc: The source URL of the header image.
//   title: The title text to be displayed in the header.
const PageHeader = ({ imageSrc, title }) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className={styles.headerWrapper}>

            {/* Header Image: Displays the image passed through the imageSrc prop */}
            <img src={imageSrc} alt="Header" className={styles.backgroundImage}  onLoad={() => setIsLoading(false)} />

            {/* Header Text: Displays the title passed through the title prop */}
            <h1 className={styles.headerText}>{title}</h1>
            {isLoading && <h2 className={styles.loading}>Loading...</h2>}
        </div>
    );
};

export default PageHeader;
