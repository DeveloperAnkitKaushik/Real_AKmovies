import React from 'react';
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container} style={{backgroundImage: `url(/bg.jpg)`}}>
        <div className="maincontainer">
            <div className={styles.innercontainer}>
                <div className={styles.logocontainer}><img src='/logo.png'></img></div>
                <div className={styles.links}>
                    <div className={styles.link1}>
                        <a href="/">Home</a>
                        <a href="/continue-watching">Watching</a>
                        <a href="/favorite">Favorite</a>
                    </div>
                    <div className={styles.link1}>
                        <a href="/result/movie/popular">Movie</a>
                        <a href="/result/tv/popular">Series</a>
                        <a href="/result/movie/popular">Popular</a>
                    </div>
                    <div className={styles.link1}>
                        <a href="/term">Term of services</a>
                        <a href="mailto:developerankitkaushik@gmail.com">Mail me</a>
                    </div>
                </div>
                <div className={styles.line}>Developed with 💖 by <a href="https://www.linkedin.com/in/ankitkaushik/" target='_blank'>Ankit Kaushik</a></div>
            </div>
        </div>
    </div>
  )
}

export default Footer