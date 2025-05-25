import React, { useEffect, useState, useCallback } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import tmdbApi, { movieType } from "../utils/tmdbApi";
import apiConfig from "../utils/apiConfig";
import styles from "./slider.module.css"
import Loader from "@/skeletons/SimpleLoader";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";


const EmblaCarousel = () => {
    const [popular, setPopular] = useState([]); // Store popular TV/movies
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
    const [activeSlide, setActiveSlide] = useState(0);

    // Fetch popular TV/movies
    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { page: 1 });

                // Get limit from Firestore
                const limitSnap = await getDoc(doc(db, "settings", "slider"));
                const limit = limitSnap.exists() ? limitSnap.data().limit : 5;

                setPopular(response.results.slice(0, limit));
            } catch (error) {
                console.error("Failed to fetch popular movies:", error);
            }
        };

        fetchPopular();
    }, []);

    // Track active slide
    const handleSelect = useCallback(() => {
        if (!emblaApi) return;
        setActiveSlide(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", handleSelect);
    }, [emblaApi, handleSelect]);

    if (!popular.length) return <Loader />;

    // Animation Variants
    const textVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const posterVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
    };

    return (
        <section className={styles.embla}>
            <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={styles.embla__container}>
                    {popular.map((item, index) => (
                        <div className={styles.container} key={item.id}>
                            <div
                                className={styles.bg}
                                style={{
                                    backgroundImage: `url(${item.backdrop_path
                                        ? `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
                                        : "/LargePosterAlt.jpg"})`,
                                }}
                            >
                                <div className={styles.bgoverlay}></div>
                                <div className={styles.bgoverlay2}></div>
                            </div>

                            {/* Slide Content */}
                            <div className="maincontainer">
                                <div className={styles.innercontainer}>
                                    {/* Text and Buttons */}
                                    <motion.div
                                        className={styles.info}
                                        key={`text-${index}`} // Add key to re-trigger animation
                                        initial="hidden"
                                        animate={index === activeSlide ? "visible" : "hidden"}
                                        variants={textVariants}
                                        transition={{ duration: 1 }}
                                    >
                                        <motion.h1
                                            initial="hidden"
                                            animate={index === activeSlide ? "visible" : "hidden"}
                                            variants={textVariants}
                                            transition={{ duration: 1.2 }}
                                        >
                                            {item.title || item.name}
                                        </motion.h1>
                                        <motion.p
                                            initial="hidden"
                                            animate={index === activeSlide ? "visible" : "hidden"}
                                            variants={textVariants}
                                            transition={{ duration: 1.4 }}
                                        >
                                            {item.overview}
                                        </motion.p>
                                        <motion.div
                                            className={styles.btn}
                                            initial="hidden"
                                            animate={index === activeSlide ? "visible" : "hidden"}
                                            variants={textVariants}
                                            transition={{ duration: 1.6 }}
                                        >
                                            <button
                                                onClick={() => (window.location.href = `/movie/${item.id}`)}
                                            >
                                                Watch Now
                                            </button>
                                        </motion.div>
                                    </motion.div>
                                    {/* Small Poster */}
                                    <motion.div
                                        className={styles.img}
                                        key={`poster-${index}`} // Add key to re-trigger animation
                                        initial="hidden"
                                        animate={index === activeSlide ? "visible" : "hidden"}
                                        variants={posterVariants}
                                        transition={{ duration: 1 }}
                                    >
                                        <img
                                            src={apiConfig.w500Image(item.poster_path)}
                                            alt={item.title || item.name}
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EmblaCarousel;
