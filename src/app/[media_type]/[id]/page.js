"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useAuth } from "../../../context/AuthContext";
import styles from "./index.module.css";
import { SlCalender } from "react-icons/sl";
import { LiaImdb } from "react-icons/lia";
import { MdAvTimer } from "react-icons/md";
import Loader from "@/skeletons/SimpleLoader";
import ShowVideoButton from "@/components/ShowVideoButton";
import toast from 'react-hot-toast';
import { FaPlayCircle } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";


export default function DetailPage() {
  const { media_type, id } = useParams();
  const { user } = useAuth();
  const [details, setDetails] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState([]);
  const [showIframePlayer, setShowIframePlayer] = useState(false);
  const [secondPlayer, setSecondPlayer] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      try {
        // Fetch TV or movie details
        const res = await fetch(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos,credits`
        );
        const data = await res.json();
        setDetails(data);

        // Extract related data
        setVideos(data.videos?.results || []);
        setCast(data.credits?.cast?.slice(0, 5) || []);

        if (media_type === "tv") {
          if (Array.isArray(data.seasons) && data.seasons.length > 0) {
            setSeasons(data.seasons);

            // Check continue watching data
            if (user) {
              const historyRef = doc(db, "users", user.uid, "history", id);
              const historySnap = await getDoc(historyRef);

              if (historySnap.exists()) {
                const { season, episode } = historySnap.data();
                const validSeason = data.seasons.some(
                  (s) => s.season_number === season
                );
                if (validSeason) {
                  setSelectedSeason(season);
                  fetchEpisodes(data.id, season, episode);
                } else {
                  // Fallback to default if season is invalid
                  fetchEpisodes(data.id, 1);
                }
              } else {
                // No continue watching data, fallback to season 1
                fetchEpisodes(data.id, 1);
              }
            } else {
              // User not logged in, fallback to season 1
              fetchEpisodes(data.id, 1);
            }
          }
        }

        // Check if already in favorites
        if (user) {
          const favoriteRef = doc(db, "users", user.uid, "favorites", id);
          const favoriteSnap = await getDoc(favoriteRef);
          setIsFavorite(favoriteSnap.exists());
        }
      } catch (error) {
        console.error("Failed to fetch details:", error);
      }

      setLoading(false);
    };

    fetchDetails();
  }, [media_type, id, user]);
  const fetchEpisodes = async (tvId, seasonNumber, episodeNumber = 1) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await res.json();
      setEpisodes(data.episodes || []);

      // Check if episode is valid
      const validEpisode = data.episodes.some(
        (ep) => ep.episode_number === episodeNumber
      );
      setSelectedEpisode(validEpisode ? episodeNumber : 1);
    } catch (error) {
      console.error("Failed to fetch episodes:", error);
    }
  };

  const handleSeasonChange = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
    fetchEpisodes(details.id, seasonNumber);
  };

  const addToContinueWatching = async () => {
    if (!user || !details) {
      toast.error('Please login First!');
      return;
    }

    const userId = user.uid;
    const historyRef = doc(db, "users", userId, "history", id);

    await setDoc(historyRef, {
      id: details.id,
      title: details.title || details.name,
      mediaType: media_type,
      posterPath: details.poster_path,
      description: details.overview,
      season: selectedSeason,
      episode: selectedEpisode,
      lastWatched: new Date().toISOString(),
    });
    setShowIframePlayer(true);
  };

  const addToFavorites = async () => {
    if (!user || !details) {
      toast.error('Please login First!');
      return;
    }

    const userId = user.uid;
    const favoritesRef = doc(db, "users", userId, "favorites", id);

    await setDoc(favoritesRef, {
      id: details.id,
      title: details.title || details.name,
      mediaType: media_type,
      posterPath: details.poster_path,
      description: details.overview,
      addedAt: new Date().toISOString(),
    });

    setIsFavorite(true);
    toast.success(`Added to your favorites.`)
  };

  const removeFromFavorites = async () => {
    if (!user) return;

    const userId = user.uid;
    const favoritesRef = doc(db, "users", userId, "favorites", id);

    await deleteDoc(favoritesRef);
    setIsFavorite(false);
    toast.success(`Removed from your favorites.`)
  };


  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      {/* Details Section */}


      <div className={styles.topimg}>
        <img
          src={
            details.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${details.backdrop_path}`
              : "/LargePosterAlt.jpg"
          }
          alt="Large Poster"
          className={styles.largePoster}
        />
        <div className={styles.backdrop}></div>
      </div>
      <div className={styles.innercontainer}>
        <div className="maincontainer">
          <div className={styles.content}>
            <div className={styles.contentimg}>
              <img
                src={details.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${details.poster_path}`
                  : "/PosterAlt.png"}
                alt={details.title || details.name || "Default Poster"}
                className={styles.poster}
              />
            </div>
            <div className={styles.info}>
              <h1>{details.title || details.name}</h1>
              <div className={styles.genres}>
                {details.genres.map((genre) => (
                  <span key={genre.id} className={styles.genre}>
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className={styles.overview}>{details.overview}</p>
              <div className={styles.metadata}>
                <p>
                  <SlCalender className={styles.metaiconcal} />{" "}
                  {details.release_date || details.first_air_date}
                </p>
                <p>
                  <LiaImdb className={styles.metaiconimdb} />{" "}
                  {details.vote_average}/10
                </p>
                <p>
                  <MdAvTimer className={styles.metaicontime} />{" "}
                  {details.runtime
                    ? `${details.runtime} mins`
                    : `${details.episode_run_time?.[0] || "N/A"} mins`}
                </p>
              </div>

              <div className={styles.actions}>
                <ShowVideoButton videos={videos} />
                {isFavorite ? (
                  <button
                    onClick={removeFromFavorites}
                    className={styles.favoriteButton}
                  >
                    Remove from Favorites
                  </button>
                ) : (
                  <button
                    onClick={addToFavorites}
                    className={styles.favoriteButton}
                  >
                    Add to Favorites
                  </button>
                )}
              </div>
              <div className={styles.castContainer}>
                <h2>Top Cast</h2>
                <div className={styles.castList}>
                  {cast.map((member) => (
                    <div key={member.id} className={styles.castMember}>
                      <img
                        src={
                          member.profile_path
                            ? `https://image.tmdb.org/t/p/w200/${member.profile_path}`
                            : "/altProfileImage.png"
                        }
                        alt={member.name}
                        className={styles.castImage}
                      />
                      <p className={styles.castName}>{member.name} as </p>
                      <p className={styles.castRole}>{member.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Season and Episode Dropdowns */}
          {media_type === "tv" && (
            <div className={styles.selectorContainer}>
              <div className={styles.selector}>
                <label htmlFor="season">Select Season:</label>
                <select
                  id="season"
                  value={selectedSeason}
                  onChange={(e) => handleSeasonChange(Number(e.target.value))}
                >
                  {seasons.map((season) => (
                    <option
                      key={season.season_number}
                      value={season.season_number}
                    >
                      {season.name || `Season ${season.season_number}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.selector}>
                <label htmlFor="episode">Select Episode:</label>
                <select
                  id="episode"
                  value={selectedEpisode}
                  onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                >
                  {episodes.map((episode) => (
                    <option
                      key={episode.episode_number}
                      value={episode.episode_number}
                    >
                      Episode {episode.episode_number}: {episode.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Vidsrc Player */}
          <div className={styles.videoContainer}>
            <h1>Use AdBlockers</h1>
            <div className={styles.changeIcon} onClick={() => {
              if (!user) {
                toast.error('Please Login First!');
                return;
              }
              setSecondPlayer(!secondPlayer);
            }}>Change Server <FaExchangeAlt /></div>
            {!showIframePlayer ? (
              <div
                className={styles.outerPlayer}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
                }}
              >
                <div className={styles.playeroverlay}>
                </div>
                <FaPlayCircle className={styles.playButton} onClick={addToContinueWatching} />
              </div>
            ) : (
              <iframe
                src={
                  media_type === "tv"
                    ? `${secondPlayer ? process.env.NEXT_PUBLIC_SECOND_VIDIOPLAYER_APP : process.env.NEXT_PUBLIC_FIRST_VIDIOPLAYER_APP}/tv/${id}/${selectedSeason}/${selectedEpisode}?autoPlay=false`
                    : `${secondPlayer ? process.env.NEXT_PUBLIC_SECOND_VIDIOPLAYER_APP : process.env.NEXT_PUBLIC_FIRST_VIDIOPLAYER_APP}/movie/${id}`
                }
                frameBorder="0"
                width="100%"
                height="500px"
                allowFullScreen
                // sandbox={secondPlayer ? undefined : "allow-scripts allow-same-origin"}
                className={styles.videoPlayer}
              />
            )}
          </div>

          {/* Trailer Popup */}
          {showTrailer && (
            <div className={styles.trailerPopup}>
              <div className={styles.trailerContent}>
                <button
                  className={styles.closeButton}
                  onClick={() => setShowTrailer(false)}
                >
                  ✖
                </button>
                <h2>Related Videos</h2>
                <div className={styles.videoList}>
                  {videos.map((video) => (
                    <div key={video.id} className={styles.videoItem}>
                      <h3>{video.name}</h3>
                      <iframe
                        src={`https://www.youtube.com/embed/${video.key}`}
                        frameBorder="0"
                        allowFullScreen
                        className={styles.trailerVideo}
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
