"use client";

import React from "react";
import styles from "./index.module.css";

export default function TermsPage() {
    return (
        <div className={styles.container}>
            <div className={styles.bg} style={{ backgroundImage: `url(/bg.jpg)` }} >
                <h1 className={styles.title}>Terms of Service</h1>
                <div className={styles.bgoverlay}></div>
            </div>
            <div className="maincontainer">
                <div className={styles.innercontainer}>
                    <p className={styles.paragraph}>
                        Welcome to <strong>AKMovies</strong>. By using this website, you agree to the following terms and conditions. Please read them carefully.
                    </p>

                    <h2 className={styles.subtitle}>Third-Party Content</h2>
                    <p className={styles.paragraph}>
                        <strong>AKMovies</strong> does not store or host any movies, TV shows, or videos on its servers. All content available on this site is sourced from third-party providers such as <strong>The Movie Database (TMDb)</strong> and video players embedded from platforms like <strong>YouTube</strong> and others.
                    </p>

                    <p className={styles.paragraph}>
                        We use publicly available APIs and services to fetch data, including information about movies, TV shows, trailers, and other media. All rights to such content belong to their respective owners.
                    </p>

                    <h2 className={styles.subtitle}>No Ownership of Media</h2>
                    <p className={styles.paragraph}>
                        <strong>AKMovies</strong> does not claim ownership of any movies, TV shows, or related media displayed on this site. We provide access to video players from external sources and do not store, distribute, or control the content available through those players.
                    </p>

                    <h2 className={styles.subtitle}>No Copyright Infringement</h2>
                    <p className={styles.paragraph}>
                        <strong>AKMovies</strong> is an informational platform and does not intend to infringe on any copyrights. If you believe any content displayed on this site violates copyright laws, please contact the respective third-party service providers directly.
                    </p>

                    <h2 className={styles.subtitle}>Disclaimer</h2>
                    <p className={styles.paragraph}>
                        <strong>AKMovies</strong> is not responsible for the accuracy, legality, or validity of the content provided by third-party services. Use of this site is entirely at your own risk.
                    </p>

                    <h2 className={styles.subtitle}>Contact Us</h2>
                    <p className={styles.paragraph}>
                        If you have any questions or concerns about these terms and conditions, please contact us via the support page.
                    </p>
                </div>
            </div>
        </div>
    );
}
