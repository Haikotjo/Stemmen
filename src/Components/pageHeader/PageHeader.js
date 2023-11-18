// PageHeader.jsx
import React from 'react';
import styles from './PageHeader.module.scss';

const PageHeader = ({ imageSrc, title }) => {
    return (
        <div className={styles.headerWrapper}>
            <img src={imageSrc} alt="Header" className={styles.backgroundImage} />
            <h1 className={styles.headerText}>{title}</h1>
        </div>
    );
};

export default PageHeader;