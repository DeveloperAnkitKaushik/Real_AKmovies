import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./HorizontalSlider.module.css";
import { FaPlay } from "react-icons/fa";
import Sus from "@/skeletons/slider";

const HorizontalSlider = ({ title, items, mediaType, onViewMore }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
    if(title == 'Continue Watching') console.log(items);
    
    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <button className={styles.viewMore} onClick={onViewMore}>
                    View More
                </button>
            </div>

            {/* Embla Carousel */}
            <div className={styles.embla} ref={emblaRef}>
                <div className={styles.emblaContainer}>
                    {items.length === 0 ? (
                        <Sus /> // Render skeleton if no items are available
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className={styles.emblaSlide}>
                                <a href={`/${title == 'Continue Watching' ?  item.mediaType :mediaType}/${item.id}`} className={styles.card}>
                                    <div
                                        className={styles.poster}
                                        style={{
                                            backgroundImage: `url(${item.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` // TMDB API
                                                    : item.posterPath
                                                        ? `https://image.tmdb.org/t/p/w500/${item.posterPath}` // Firebase
                                                        : "/placeholder-image.jpg" // Placeholder
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
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HorizontalSlider;
