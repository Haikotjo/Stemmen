import React from 'react';
import styles from './ResultCard.module.scss';

const ResultCard = ({ score, reaction, memory, verbal, visual }) => {
    return (
        <div className={styles.ResultCard}>
            <div className={styles.cardHeader}>
                Your Result
                <div className={styles.score}>{score}</div>
                Great
                <div className={styles.scoreDescription}>You scored higher than 65% of the people who have taken these tests.</div>
            </div>
            <div className={styles.cardBody}>
                <h2 className={styles.summaryTitle}>Summary</h2>
                <div className={styles.scoreLine}>
                    <span>Reaction</span>
                    <span>{reaction} / 100</span>
                </div>
                <div className={styles.scoreLine}>
                    <span>Memory</span>
                    <span>{memory} / 100</span>
                </div>
                <div className={styles.scoreLine}>
                    <span>Verbal</span>
                    <span>{verbal} / 100</span>
                </div>
                <div className={styles.scoreLine}>
                    <span>Visual</span>
                    <span>{visual} / 100</span>
                </div>
                <button className={styles.continueButton}>
                    Continue
                </button>
            </div>
        </div>
    );
}

export default ResultCard;
