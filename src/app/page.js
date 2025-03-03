"use client";

import React, { useEffect, useState } from "react";
import tmdbApi, { movieType, tvType } from "../utils/tmdbApi";
import HorizontalSlider from "@/components/HorizontalSlider";
import { useAuth } from "@/context/AuthContext";
import { collection, getDocs, query as firestoreQuery, orderBy } from "firebase/firestore";
import { db } from "../utils/firebase";
import Head from "next/head"; // Import for SEO meta tags
import styles from "./index.module.css";
import Slider from "@/components/Slider";

export default function HomePage() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);
    const [topRatedTV, setTopRatedTV] = useState([]);
    const [continueWatching, setContinueWatching] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState("");

    const { user } = useAuth();

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

                setTrendingMovies(trendingMoviesRes.results.slice(0, 15));
                setTopRatedMovies(topRatedMoviesRes.results.slice(0, 15));
                setTrendingTV(trendingTVRes.results.slice(0, 15));
                setTopRatedTV(topRatedTVRes.results.slice(0, 15));
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchContinueWatching = async () => {
            if (!user) return;

            try {
                const historyCollection = firestoreQuery(
                    collection(db, "users", user.uid, "history"),
                    orderBy("lastWatched", "desc") // Sorting by lastWatched in descending order
                );

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

            const movies = movieResults.results.map((item) => ({
                ...item,
                media_type: "movie",
            }));
            const tvShows = tvResults.results.map((item) => ({
                ...item,
                media_type: "tv",
            }));

            setSearchResults([...movies, ...tvShows]);
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    // Update search results when the query changes
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSearch(query);
        }, 500);

        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <>
            <Head>
                <title>AKMovies - Stream Your Favorite Movies and TV Shows</title>
                <meta name="description" content="AKMovies allows you to stream trending movies and TV shows, track your favorites, and continue watching seamlessly." />
                <meta name="keywords" content="Movies, TV Shows, Streaming, AKMovies, Entertainment" />
                <meta name="author" content="Ankit Kaushik" />
                <meta property="og:title" content="AKMovies - Stream Movies and TV Shows" />
                <meta property="og:description" content="Stream trending movies and TV shows with AKMovies. Track favorites and continue watching seamlessly." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://realakmovies.vercel.app" />
                <meta property="og:image" content="https://realakmovies.vercel.app/logo.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="AKMovies - Stream Movies and TV Shows" />
                <meta name="twitter:description" content="Stream trending movies and TV shows with AKMovies. Track favorites and continue watching seamlessly." />
                <meta name="twitter:image" content="https://realakmovies.vercel.app/logo.png" />
            </Head>
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
                            mediaType="mixed"
                            onViewMore={null}
                        />
                    ) : (
                        <>
                            {/* Continue Watching Section */}
                            {user && continueWatching.length > 0 && (
                                <HorizontalSlider
                                    title="Continue Watching"
                                    items={continueWatching}
                                    mediaType="mixed"
                                    onViewMore={() => (window.location.href = "/continue-watching")}
                                />
                            )}

                            {/* Horizontal Sliders */}
                            <HorizontalSlider
                                title="Trending Movies"
                                items={trendingMovies}
                                mediaType="movie"
                                onViewMore={() => (window.location.href = "/result/movie/popular")}
                            />
                            <HorizontalSlider
                                title="Top Rated Movies"
                                items={topRatedMovies}
                                mediaType="movie"
                                onViewMore={() => (window.location.href = "/result/movie/top_rated")}
                            />
                            <HorizontalSlider
                                title="Trending TV"
                                items={trendingTV}
                                mediaType="tv"
                                onViewMore={() => (window.location.href = "/result/tv/popular")}
                            />
                            <HorizontalSlider
                                title="Top Rated TV"
                                items={topRatedTV}
                                mediaType="tv"
                                onViewMore={() => (window.location.href = "/result/tv/top_rated")}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
