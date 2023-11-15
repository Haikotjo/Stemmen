import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageDescriptionBlock.module.scss';

const PageDescriptionBlock = ({ route, description, title }) => {
    return (
        <Link to={route} className={`${styles.pageDescriptionBlock} ${styles.linkHover}`}>
            <h2 className={styles.pageTitle}>{title}</h2>
            <div className={styles.pageDescription}>{description}</div>
        </Link>
    );
};

export default PageDescriptionBlock;
