"use client";

import React, { useEffect, useState } from "react";
import tmdbApi, { movieType, tvType } from "../utils/tmdbApi";
import HorizontalSlider from "@/components/HorizontalSlider";
import { useAuth } from "@/context/AuthContext"; // Assuming you have an AuthContext
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase"; // Assuming Firebase is initialized here
import styles from "./index.module.css";
import Slider from "@/components/Slider";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]); // Continue Watching section
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");

  const { user } = useAuth(); // User info from AuthContext

  // Fetch data for sliders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingMoviesRes, topRatedMoviesRes, trendingTVRes, topRatedTVRes] =
          await Promise.all([
            tmdbApi.getMoviesList(movieType.popular, { page: 1 }),
            tmdbApi.getMoviesList(movieType.top_rated, { page: 1 }),
            tmdbApi.getTvList(tvType.popular, { page: 1 }),
            tmdbApi.getTvList(tvType.top_rated, { page: 1 }),
          ]);

        setTrendingMovies(trendingMoviesRes.results.slice(0, 15)); // Limit to 15 items
        setTopRatedMovies(topRatedMoviesRes.results.slice(0, 15)); // Limit to 15 items
        setTrendingTV(trendingTVRes.results.slice(0, 15)); // Limit to 15 items
        setTopRatedTV(topRatedTVRes.results.slice(0, 15)); // Limit to 15 items
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch continue watching data from Firebase
  useEffect(() => {
    const fetchContinueWatching = async () => {
      if (!user) return;

      try {
        const historyCollection = collection(db, "users", user.uid, "history");
        const snapshot = await getDocs(historyCollection);
        const historyData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setContinueWatching(historyData);
      } catch (error) {
        console.error("Failed to fetch continue watching data:", error);
      }
    };

    fetchContinueWatching();
  }, [user]);

  // Handle search functionality
  const handleSearch = async (searchQuery) => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    try {
      const [movieResults, tvResults] = await Promise.all([
        tmdbApi.search("movie", { query: searchQuery, page: 1 }),
        tmdbApi.search("tv", { query: searchQuery, page: 1 }),
      ]);

      setSearchResults([...movieResults.results, ...tvResults.results]);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // Update search results when the query changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch(query);
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className={styles.container}>
      <Slider />
      <div className="maincontainer">
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for movies or TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 ? (
          <HorizontalSlider
            title="Search Results"
            items={searchResults}
            mediaType="mixed" // Can be a mix of movies and TV shows
            onViewMore={null} // No "View More" for search results
          />
        ) : (
          <>
            {/* Continue Watching Section */}
            {user && continueWatching.length > 0 && (
              <HorizontalSlider
                title="Continue Watching"
                items={continueWatching}
                mediaType="movie" // Assuming it's a mix of movies and TV shows
                onViewMore={() => (window.location.href = "/continue-watching")}
              />
            )}

            {/* Horizontal Sliders */}
            <HorizontalSlider
              title="Trending Movies"
              items={trendingMovies}
              mediaType="movie"
              onViewMore={() => (window.location.href = "result/movie/popular")}
            />
            <HorizontalSlider
              title="Top Rated Movies"
              items={topRatedMovies}
              mediaType="movie"
              onViewMore={() => (window.location.href = "result/movie/top_rated")}
            />
            <HorizontalSlider
              title="Trending TV"
              items={trendingTV}
              mediaType="tv"
              onViewMore={() => (window.location.href = "result/tv/popular")}
            />
            <HorizontalSlider
              title="Top Rated TV"
              items={topRatedTV}
              mediaType="tv"
              onViewMore={() => (window.location.href = "result/tv/top_rated")}
            />
          </>
        )}
      </div>
    </div>
  );
}
