import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageDescriptionBlock.module.scss';

const PageDescriptionBlock = ({ route, description, title }) => {
    return (
        <div className={`${styles.pageDescriptionBlock} ${styles.linkHover}`}>

            <h2 className={styles.pageTitle}>{title}</h2>
            <div className={styles.pageLink}>
            <Link className={styles.pageDescription} to={route}>{description}</Link>
            </div>
        </div>
    );
};

export default PageDescriptionBlock;
