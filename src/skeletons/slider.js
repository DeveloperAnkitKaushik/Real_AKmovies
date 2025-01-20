import React from 'react';
import styles from './slider.module.css';

const slider = () => {
    let limit = 5;
    return (
        <div className={styles.container}>
            <div className={styles.innercontainer}>
                {[...Array(limit)].map((_, index) => (
                    <div className={styles.productcontainer} key={index}>
                        <div className={`${styles.img} ${styles.loading}`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default slider;