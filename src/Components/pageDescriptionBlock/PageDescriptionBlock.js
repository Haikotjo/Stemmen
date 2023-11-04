import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageDescriptionBlock.module.scss';

const PageDescriptionBlock = ({ route, description }) => {
    return (
        <div className={styles.pageDescriptionBlock}>
            <Link to={route}>{description}</Link>
        </div>
    );
};

export default PageDescriptionBlock;
