"use client";

import React, { useState } from "react";
import styles from "./ShowVideoButton.module.css";

export default function ShowVideoButton({ videos }) {
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  // Filter videos to get the first trailer or teaser
  const trailer = videos.find(
    (video) => video.type === "Trailer" || video.type === "Teaser"
  );

  const openVideoPopup = () => {
    setShowVideoPopup(true);
  };

  const closeVideoPopup = () => {
    setShowVideoPopup(false);
  };

  return (
    <div>
      <button className={styles.showVideosButton} onClick={openVideoPopup}>
        Show Trailer
      </button>

      {showVideoPopup && trailer && (
        <div className={styles.videoPopupOverlay}>
          <div className={styles.videoPopup}>
            <button className={styles.closeButton} onClick={closeVideoPopup}>
              ✖
            </button>
            <h2>{trailer.name || "Trailer"}</h2>
            <div className={styles.videoPlayerContainer}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                frameBorder="0"
                allowFullScreen
                title={trailer.name}
                className={styles.videoPlayer}
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {showVideoPopup && !trailer && (
        <div className={styles.videoPopupOverlay}>
          <div className={styles.videoPopup}>
            <button className={styles.closeButton} onClick={closeVideoPopup}>
              ✖
            </button>
            <p>No trailer available</p>
          </div>
        </div>
      )}
    </div>
  );
}
