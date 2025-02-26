"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import tmdbApi, { movieType, tvType } from "@/utils/tmdbApi";
import styles from "./index.module.css";
import { FaPlay } from "react-icons/fa";
import Loader from "@/skeletons/SimpleLoader";
import Head from "next/head";

export default function MediaListPage() {
  const { media_type, id } = useParams();
  console.log(media_type, id);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getCategory = () => {
    if (media_type === "movie") {
      return movieType[id]; // Ensure 'id' matches keys in movieType
    } else if (media_type === "tv") {
      return tvType[id]; // Ensure 'id' matches keys in tvType
    }
    return null; // Handle invalid cases
  };

  const fetchItems = async (pageNumber) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadMoreLoading(true);

      const category = getCategory();
      if (!category) {
        console.error("Invalid category:", id);
        setLoading(false);
        setLoadMoreLoading(false);
        return;
      }

      console.log("Fetching category:", category, "Page:", pageNumber);

      const response =
        media_type === "movie"
          ? await tmdbApi.getMoviesList(category, { page: pageNumber })
          : await tmdbApi.getTvList(category, { page: pageNumber });

      setItems((prev) => [...prev, ...response.results]); // Append results
    } catch (error) {
      console.error("Failed to fetch items:", error.message);
    } finally {
      setLoading(false);
      setLoadMoreLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchItems(nextPage);
  };

  useEffect(() => {
    setPage(1); // Reset to the first page on media type or category change
    setItems([]);
    fetchItems(1);
  }, [media_type, id]);

  if (loading && page === 1) return <Loader />;

  return (
    <>
      <Head>
        <title>{`${id.replace("-", " ").toUpperCase()} - Watch ${media_type === "movie" ? "Movies" : "TV Shows"} Online`}</title>
        <meta
          name="description"
          content={`Stream ${id.replace("-", " ")} online for free. Discover top-rated ${media_type === "movie" ? "movies" : "TV shows"} and enjoy unlimited streaming.`}
        />
        <meta name="keywords" content={`Watch ${id}, ${id} full ${media_type}, ${id} free online`} />
        <meta property="og:title" content={`${id.replace("-", " ").toUpperCase()} - Watch Online`} />
        <meta
          property="og:description"
          content={`Watch ${id.replace("-", " ")} ${media_type === "movie" ? "movie" : "TV show"} online for free in HD.`}
        />
        <meta property="og:image" content="https://image.tmdb.org/t/p/w500/sample-image.jpg" />
      </Head>
      <div className={styles.outercontainer}>
        <div className={styles.bg} style={{ backgroundImage: `url(/bg.jpg)` }}>
          <h1 className={styles.title}>{id.replace("-", " ").toUpperCase()}</h1>
          <div className={styles.bgoverlay}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.grid}>
            {items.map((item, i) => (
              <a href={`/${media_type}/${item.id}`} key={i} className={styles.card}>
                <div
                  className={styles.poster}
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
                  }}
                >
                  <div className={styles.hover}>
                    <div className={styles.innerhover}>
                      <FaPlay />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
          {loadMoreLoading ? (
            <p>Loading more...</p>
          ) : (
            <button className={styles.loadMoreButton} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
}
