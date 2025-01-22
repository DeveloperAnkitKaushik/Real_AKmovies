import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./HorizontalSlider.module.css";
import { FaPlay } from "react-icons/fa";
import Loader from "@/skeletons/HorizontalLoader";

const HorizontalSlider = ({ title, items, mediaType, onViewMore }) => {
    const [emblaRef] = useEmblaCarousel({ loop: false, dragFree: true });
    console.log(items);
    
    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {onViewMore && (
                    <button className={styles.viewMore} onClick={onViewMore}>
                        View More
                    </button>
                )}
            </div>

            {/* Embla Carousel */}
            <div className={styles.embla} ref={emblaRef}>
                <div className={styles.emblaContainer}>
                    {items.length === 0 ? (
                        <Loader /> // Render skeleton if no items are available
                    ) : (
                        items.map((item) => {
                            const resolvedMediaType = item.media_type || item.mediaType || mediaType; // Handle mixed results
                            return (
                                <div key={item.id} className={styles.emblaSlide}>
                                    <a
                                        href={`/${resolvedMediaType}/${item.id}`}
                                        className={styles.card}
                                    // href={`/${resolvedMediaType || (title === "Continue Watching" ? item.mediaType : mediaType)}/${item.id}`}
                                    >
                                        <div
                                            className={styles.poster}
                                            style={{
                                                backgroundImage: `url(${item.poster_path || item.posterPath
                                                        ? `https://image.tmdb.org/t/p/w500/${item.posterPath || item.poster_path
                                                        }`
                                                        : "/placeholder-image.jpg"
                                                    })`,
                                            }}
                                        >
                                            <div className={styles.hover}>
                                                <div className={styles.innerhover}>
                                                    <FaPlay />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default HorizontalSlider;
